import {Minus} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { TypingContextData } from "../TypingContext"

const Top =() =>{
    const GlobalData=useContext(TypingContextData)

    return(
        <div className="text-white flex items-center gap-4">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-mono">{Number.isFinite(GlobalData.wpm)?GlobalData.wpm:0}</h2>
                <h2 className="text-gray-400">WPM</h2>
            </div>
            <Minus size={50} strokeWidth={0.5} className="rotate-90 text-gray-400"/>
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-mono">{Number.isFinite(GlobalData.accuracy)?GlobalData.accuracy:0}%</h2>
                <h2 className="text-gray-400">Accuracy</h2>
            </div>
            <Minus size={50} strokeWidth={0.5} className="rotate-90 text-gray-400"/>
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-mono">{GlobalData.remainingTime}s</h2>
                <h2 className="text-gray-400">Time</h2>
            </div>
        </div>
    )
}

export default Top