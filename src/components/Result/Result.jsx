import { useContext, useEffect, useState } from "react";
import { Zap, TriangleAlert, Crosshair, RotateCcw, ArrowRight, BrainCircuit } from 'lucide-react'
import Tile from './Tile';
import LetterTile from './LetterTile';
import { useLocation, useNavigate } from "react-router-dom";
import { TypingContextData } from "../TypingContext";

const Result = () => {
    const GlobalData=useContext(TypingContextData)
    const [result, setResult] = useState({ "WPM": 0, "Accuracy": 0, "Incorrect": 0, "IncorrectLetters": [] })
    const[errorKeys, setErrorKeys] = useState([])
    const navigate=useNavigate()
    const location = useLocation()
    const {WPM, Accuracy, Incorrect, IncorrectLetters} = location.state || {WPM: 0, Accuracy: 0, Incorrect: 0, IncorrectLetters:[]}

    useEffect(()=>{if (WPM==0 || Number.isNaN(WPM)) navigate("/")},[])

    useEffect(()=>{
        if (IncorrectLetters.length>0){
        setErrorKeys(IncorrectLetters)}
    },[location])
    return (
        <div className="text-white flex items-center flex-col gap-6 max-w-4xl">
            <h2 className="text-3xl font-bold">Test Complete</h2>
            <div className='flex gap-4'>
                <Tile logo={<Zap size={20} color="#44ff00"/>} num={parseInt(WPM)} text="WPM" />
                <Tile logo={<Crosshair size={20}/>} num={Number.isFinite(parseInt(Accuracy))?parseInt(Accuracy):0} text="Accuracy" />
                <Tile logo={<TriangleAlert size={20} color="red"/>} num={Incorrect} text="Errors" />
            </div>
            {IncorrectLetters.length>0 && <div className='rounded-2xl m-4 px-6 py-4 w-full flex flex-col items-center gap-2 bg-gray-900'>
                <h2 className="text-xl font-bold">Most Mistyped Keys</h2>
                <div className="flex flex-wrap">
                    {errorKeys.map((key, kid)=>{
                        if  (key.char!=" ")
                            return <LetterTile char={key.char} count={key.count} key={kid} />
                    })}
                    {/* <LetterTile/> */}
                </div>
            </div>}
            <div className="flex gap-1">
                <button className="bg-gray-900 px-6 py-3 m-2 rounded-xl flex gap-2 items-center active:scale-95" onClick={()=>{navigate("/");}}><RotateCcw size={18}/>Retry Test</button>
                {/* <button className="bg-[hsl(142,71%,45%)] px-6 py-3 m-2 rounded-xl flex gap-2 items-center active:scale-95">New Test<ArrowRight size={18}/></button> */}
                {/* {IncorrectLetters.length>0 && <button className="bg-blue-600 px-6 py-3 m-2 rounded-xl flex gap-2 items-center active:scale-95"><BrainCircuit size={18}/>Analyze</button>} */}
            </div>
        </div>
    )
}

export default Result;