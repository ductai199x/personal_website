import { FC, useContext } from "react";
import cx from "classnames";
import Image from "next/image";
import MatrixRain from "./MatrixRain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import style from "../styles/AboutMe.module.css";
import { ThemeCtx } from "../pages/_app";
import { Button, Card, Elevation } from "@blueprintjs/core";


const social = {
    facebook: {
        href: "https://facebook.com/ductai199x",
        icon: faFacebook,
    },
    linkedin: {
        href: "https://linkedin.com/in/tai-duc-nguyen",
        icon: faLinkedin,
    },
    github: {
        href: "https://github.com/ductai199x",
        icon: faGithub,
    },
    gmail: {
        href: "mailto:taiducnguyen.drexel@gmail.com",
        icon: faGoogle,
    },
};

const descriptionList = ["24 years old", "PhD student", "Drexel University"];

const shortPara =
    "Prolific, full stack web developer with a passion for metrics and beating former 'best-yets.' \
    Prototyped 25 new product features per year for Flexor, Inc. Decreased rework by 22% and costs by 15%. \
    Consistently receive high user experience scores for all web development projects, \
    including a 55% increase for Flexor, Inc. Passionate about building world class web applications. \
    One of my sites received a 2015 Webby for Best Navigation and Structure.";

// https://colorlib.com/wp/resume-website-templates/
export const AboutMe: FC = () => {
    const { theme } = useContext(ThemeCtx);

    return (
        <div className={cx(style["about-me"], theme)}>
            <div className={style["cool-picture"]}>
                <MatrixRain className={style["matrix-rain"]} />
                <Image className={style["overlay"]} src="/myface.png" layout="fill" />
                <div className={style["intro"]}>
                    <div className={style["name"]}>
                        <h1>
                            <b>Tai Nguyen</b>
                        </h1>
                    </div>
                    <div className={style["jobs"]}>Developer, ML Researcher</div>
                    <div className={style["social"]}>
                        <ul className={style["social-list"]}>
                            {Object.keys(social).map((key, idx) => {
                                return (
                                    <li id={key} key={key}>
                                        <a href={social[key]["href"]}>
                                            <FontAwesomeIcon icon={social[key]["icon"]} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cx(style["resume"], theme)}>
                <div className={style["short-desc"]}>
                    <div className={style["desc"]}>
                        <b>about me</b>
                    </div>
                    <div className={style["desc-list"]}>
                        {descriptionList.map((k, i) => {
                            return <div className={style["desc-item"]}>{k}</div>;
                        })}
                    </div>
                    <div className={style["desc-para"]}>{shortPara}</div>

                    <hr className="hr1" />
                </div>

                <div className={style["tech-knowledge"]}>
                    <div className={style["desc"]}>
                        <b>my experience</b>
                    </div>
                    <div className={style["exp-list"]}>
                        <Card interactive={true} elevation={Elevation.TWO}>
                            <h5><a href="#">Card heading</a></h5>
                            <p>Card content</p>
                            <Button>Submit</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
