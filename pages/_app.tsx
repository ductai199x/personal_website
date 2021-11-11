import { createContext, useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import '../styles/globals.css'

type Theme = "light" | "dark"
type ThemeCtx = {
    theme: Theme
    toggleTheme: () => void
}

export const ThemeCtx = createContext<ThemeCtx>({} as ThemeCtx)

const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState<Theme>("light")

    const toggleTheme = () => {
        setTheme(theme => (theme == "light" ? "dark": "light"));
        localStorage.setItem("theme", theme == "light" ? "dark": "light");
    }

    useEffect(() => {
        if (localStorage.getItem("theme") === "light") {
            setTheme(theme => "light");
        } else if (localStorage.getItem("theme") === "dark") {
            setTheme(theme => "dark");
        }
    })

    return (
        <>
            <ThemeCtx.Provider value={{ theme, toggleTheme }}>
                <Navbar />
                <Component {...pageProps} />
            </ThemeCtx.Provider>
        </>
    )
}

export default MyApp
