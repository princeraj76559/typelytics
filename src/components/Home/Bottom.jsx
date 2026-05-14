import { RotateCcw } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { TypingContextData } from "../TypingContext"

const button = () => {
    const navigate = useNavigate()
    const GlobalData = useContext(TypingContextData)
    useEffect(() => {
        GlobalData.setRemainingTime(GlobalData.time)
    }, [GlobalData.time])
    return (
        <div className="flex gap-4">
            {!(GlobalData.hidden) &&<div className="text-gray-400 bg-gray-800 rounded-xl">
                <button className={`p-2 m-1 rounded-xl font-mono ${GlobalData.time === 5 ? "bg-[hsl(142,71%,45%)] text-white" : "bg-gray-800" }`} onClick={() =>GlobalData.setTime(5)}>5s</button>
                <button className={`p-2 m-1 rounded-xl font-mono ${GlobalData.time === 15 ? "bg-[hsl(142,71%,45%)] text-white" : "bg-gray-800" }`} onClick={()=>GlobalData.setTime(15)}>15s</button>
                <button className={`p-2 m-1 rounded-xl font-mono ${GlobalData.time === 30 ? "bg-[hsl(142,71%,45%)] text-white" : "bg-gray-800" }`} onClick={()=>GlobalData.setTime(30)}>30s</button>
                <button className={`p-2 m-1 rounded-xl font-mono ${GlobalData.time === 60 ? "bg-[hsl(142,71%,45%)] text-white" : "bg-gray-800" }`} onClick={()=>GlobalData.setTime(60)}>60s</button>
            </div>}

            <div className="text-gray-400 bg-gray-800 p-2 rounded-xl flex items-center gap-2 active:scale-95 cursor-default" onClick={()=>{navigate(0)}}>
                <RotateCcw size={20} /> Reset
            </div>
            {/* <div className="text-gray-400 bg-gray-800 p-2 rounded-xl">
                <button className="p-2 font-mono">Easy</button>
                <button className="p-2 font-mono">Medium</button>
                <button className="p-2 font-mono">Hard</button>
            </div> */}
        </div>
    )
}

export default button