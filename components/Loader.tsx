import { FC } from "react"

interface Props {
    show: boolean
}

export const Loader: FC<Props> = ({ show }) => {
    return show ?
        <div className="loader"></div> :
        null 
}