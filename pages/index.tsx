import Head from "next/head";
import Image from "next/image";
import cx from "classnames";
import { FC, useContext, useState } from "react";
import { AboutMe } from "../components/AboutMe";
import styles from "../styles/Home.module.css";
import { ThemeCtx } from "./_app";

const Home: FC = () => {

    const { theme } = useContext(ThemeCtx);

    return (
        <main className={cx(styles["main"], theme)}> 
            <AboutMe />
        </main>
    )
}

export default Home;