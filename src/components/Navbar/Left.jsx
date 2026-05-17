import { useContext } from "react";
import {Keyboard} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { TypingContextData } from "../TypingContext";

const Left = () => {
    const GlobalData = useContext(TypingContextData)
    const navigate=useNavigate()
    return (
            <h1 className="text-[hsl(142,71%,45%)] text-2xl flex items-center cursor-pointer"  
            onClick={()=>{
                navigate("/");
            }}>
            <Keyboard size={24} className="mr-2 mt-1"/>
            <span className="text-white">Type</span>
            Lytics
            </h1>
    );
}

export default Left