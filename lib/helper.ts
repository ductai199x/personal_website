import { colors } from "./color";

export const getRandomInt = (min: number = 0, max: number = 1): number => {
    return Math.floor(Math.random() * Math.abs(max - min)) + min;
};

export const getColorsByDiffer = (time: number, offset: number): string => {
    let red = 255 * (1 - time);
    let grn = 255 * (1 - time);
    let blu = 255 * time;
    return `rgba(${red},${grn},${blu})`;
};

export const getRainbowMatrix = (differ: number, width: number, height: number): string[][] => {
    let matrix: string[][] = [];
    for (let row = 0; row < height; row++) {
        matrix.push([]);
        for (var col = 0; col < width; col++) {
            matrix[matrix.length - 1].push(
                getColorsByDiffer(
                    (Math.sin((differ + col / width) * (differ + row / height) * 2 * Math.PI) + 1) / 2,
                    0
                )
            );
        }
    }
    return matrix;
};

export const hexToRgbA = (hex: string, alpha: number): string => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + `,${alpha})`;
    }
    return `rgba(0,0,0,${alpha})`;
};

export const rgbaToHex = (rgba: string): string => {
    let vals = rgba.split("(")[1].split(")")[0].split(",");
    let hex = "#";
    for (let ii = 0; ii < 3; ii++) {
        let nn = parseInt(vals[ii].trim()).toString(16);
        if (nn.length == 1) {
            nn = "0" + nn;
        }
        hex += nn;
    }
    return hex;
};

export const colorNameToHex = (str: string) : string | null =>
{
    if (typeof colors[str.toLowerCase()] != 'undefined')
        return colors[str.toLowerCase()];

    return null;
}