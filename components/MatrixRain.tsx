import cx from "classnames";
import { useContext, useEffect, useRef, useState } from "react";

import { colorNameToHex, getRainbowMatrix, getRandomInt, hexToRgbA, rgbaToHex } from "../lib/helper";
import { ThemeCtx } from "../pages/_app";

interface Drop {
    xPos: number;
    yPos: number;
    firstChar: string;
    word: string;
    trailLength: number;
    fullText: string;
}

export interface MatrixRainProps {
    className?: string;
    drawTimerMs?: number;
    fgColor?: string;
    bgColor?: string;
    tipColor?: string;
    fontSize?: number;
    bgAlpha?: number;
    rainbow?: boolean;
    maxCycle?: number;
    yVelocity?: number;
    maxTrailLength?: number;
    minTrailLength?: number;
    word?: string;
    spawnChance?: number;
}

const defaultProps: MatrixRainProps = {
    className: "matrix-rain",
    drawTimerMs: 40,
    fgColor: "#00ff00",
    bgColor: "#000000",
    tipColor: "#FFFFFF",
    fontSize: 14,
    bgAlpha: 0.3,
    rainbow: true,
    maxCycle: 100,
    yVelocity: 2.5,
    maxTrailLength: 10,
    minTrailLength: 3,
    word: "",
    spawnChance: 0.12,
};

const getRainSize = (
    winWidth: number,
    winHeight: number,
    fontSize: number
): { columns: number; rows: number } => {
    return {
        columns: Math.floor(winWidth / fontSize) + 1,
        rows: Math.floor(winHeight / fontSize) + 1,
    };
};

const getNextRandChar = (): string => {
    return String.fromCodePoint(getRandomInt(65381, 65440));
};

const drawDrop = (
    xPos: number,
    yPos: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    fixChar: string = ""
) => {
    let cha = fixChar;
    if (cha === "") {
        cha = getNextRandChar();
    }
    ctx.fillStyle = color;
    ctx.fillText(cha, xPos, yPos);
};

const getNewFullTrailForDrop = (drop: Drop): string => {
    let word = "";
    let fixFirstPart = drop.word !== "" ? drop.word : drop.firstChar;

    if (drop.trailLength > fixFirstPart.length) {
        if (drop.fullText === "") {
            let newFullRandom = "";
            for (let ii = 0; ii < drop.trailLength - fixFirstPart.length; ii++) {
                newFullRandom += getNextRandChar();
            }
            word = fixFirstPart + newFullRandom;
        } else {
            let randomPart =
                getNextRandChar() + drop.fullText.substring(fixFirstPart.length, drop.fullText.length - 1);
            word = fixFirstPart + randomPart;
        }
    } else {
        word = drop.word;
    }

    return word;
};

const MatrixRain = (props: MatrixRainProps) => {
    props = { ...defaultProps, ...props };
    const { theme } = useContext(ThemeCtx);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtx: CanvasRenderingContext2D | null = null;

    const getWidth = () => {
        return canvasCtx!.canvas.width;
    };
    const getHeight = () => {
        return canvasCtx!.canvas.height;
    };
    const getRainSize_ = () => {
        return getRainSize(getWidth(), getHeight(), props.fontSize);
    };

    let rain: Drop[] = [];
    let timer: NodeJS.Timer;
    let cycleCount = 0;
    let dropPosDelta = 0;
    let atRowUpdate = true;

    const createNewDrop = (startX: number, startY: number): Drop => {
        return {
            xPos: startX,
            yPos: startY,
            firstChar: getNextRandChar(),
            word: props.word!,
            trailLength: getRandomInt(props.minTrailLength, props.maxTrailLength),
            fullText: "",
        };
    };

    const initializeDrops = () => {
        let size = getRainSize_();

        for (let colI = 0; colI < size.columns; colI++) {
            let yPos = getRandomInt(0, size.rows * props.fontSize);
            let xPos = colI * props.fontSize;

            let drop = createNewDrop(xPos, yPos);
            rain.push(drop);
        }
    };

    const spawnExtraRain = () => {
        let size = getRainSize_();

        for (let colI = 0; colI < size.columns; colI++) {
            if (Math.random() <= props.spawnChance) {
                let yPos = 0;
                let xPos = colI * props.fontSize;
                let drop = createNewDrop(xPos, yPos);

                rain.push(drop);
            }
        }
    };

    const incrementAllDropsAndKill = () => {
        let size = getRainSize_();
        let nextRain: Drop[] = [];

        for (let dropIndex in rain) {
            let drop = rain[dropIndex];
            drop.yPos += props.yVelocity;
            if (drop.yPos < (size.rows + 7) * props.fontSize) {
                nextRain.push(drop);
            }
        }
        rain = nextRain;
    };

    const drawFullRainDrop = (drop: Drop, rainbow: string[][], ctx: CanvasRenderingContext2D) => {
        ctx.font = props.fontSize + "px Helvetica";
        let realTrailLength = Math.max(drop.trailLength, drop.word.length);
        let baseColor = props.fgColor;
        if (props.rainbow) {
            let roundX = Math.floor(drop.xPos / props.fontSize);
            let roundY = Math.floor(drop.yPos / props.fontSize);

            let triedRainbow = "";
            try {
                triedRainbow = rainbow[roundY][roundX];
                if (triedRainbow !== undefined && triedRainbow !== "") {
                    baseColor = rgbaToHex(triedRainbow);
                }
            } catch {}
        }

        let atFgColor = hexToRgbA(baseColor, 1);
        let realWord = drop.fullText;

        if (atRowUpdate || realWord === "") {
            realWord = getNewFullTrailForDrop(drop);
            drop.fullText = realWord;
        }
        for (let ii = 0; ii < realTrailLength; ii++) {
            let realColor = props.tipColor !== "" && ii === 0 ? props.tipColor : atFgColor;
            let realY = drop.yPos - ii * props.fontSize;
            if (realY > 0) {
                drawDrop(drop.xPos, realY, realColor, ctx, realWord[ii]);
            }
            if (ii !== 0) atFgColor = hexToRgbA(baseColor, 1 - ii / realTrailLength);
        }
    };

    let ratio: number;
    const updateCanvasDims = () => {
        if (canvasRef.current) {
            ratio = window.devicePixelRatio;
            let w = canvasRef.current.parentElement.getBoundingClientRect().width;
            let h = canvasRef.current.parentElement.getBoundingClientRect().height;
            canvasRef.current.width = Math.floor(w);
            canvasRef.current.height = Math.floor(h);
            if (canvasCtx === null) canvasCtx = canvasRef.current.getContext("2d");
            else canvasCtx.scale(ratio, ratio);
        }
    };

    const drawLoop = () => {
        updateCanvasDims();
        if (canvasCtx !== null) {
            canvasCtx.fillStyle = theme == "light" ? "white" : "black";
            canvasCtx.fillRect(0, 0, getWidth(), getHeight());
            canvasCtx.beginPath();

            if (rain.length === 0) {
                initializeDrops();
            }
            if (atRowUpdate) {
                spawnExtraRain();
            }

            let sizeCols = getRainSize_();
            let differ = (Math.sin((cycleCount / props.maxCycle) * 2 * Math.PI) + 1) / 2;

            let rainbow = getRainbowMatrix(differ, sizeCols.columns, sizeCols.rows);
            for (let rainIndex in rain) {
                let drop = rain[rainIndex];
                drawFullRainDrop(drop, rainbow, canvasCtx);
            }
            incrementAllDropsAndKill();

            cycleCount++;
            cycleCount = cycleCount % props.maxCycle;
            dropPosDelta += props.yVelocity;
            dropPosDelta = dropPosDelta >= props.fontSize ? 0 : dropPosDelta;
            atRowUpdate = dropPosDelta === 0;
        }
    };

    const startDraw = () => {
        if (timer) stopDraw();

        timer = setInterval(drawLoop, props.drawTimerMs);
    };

    const stopDraw = () => {
        if (timer) clearInterval(timer);
    };

    useEffect(() => {
        startDraw();
        return () => {
            stopDraw();
        };
    });

    useEffect(() => {
        if (theme == "light") {
            props.fgColor = colorNameToHex("black");
            props.bgColor = colorNameToHex("white");
            props.tipColor = colorNameToHex("black");
        } else if (theme == "dark") {
            props.fgColor = colorNameToHex("white");
            props.bgColor = colorNameToHex("black");
            props.tipColor = colorNameToHex("white");
        }
    }, [theme]);

    return (
        <canvas
            className={cx(props.className, theme)}
            ref={canvasRef}
        ></canvas>
    );
};

export default MatrixRain;
