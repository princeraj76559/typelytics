import { createContext, useContext } from "react";
import { useState } from "react";

export const TypingContextData = createContext();

const TypingContext = ({children}) =>{
    const [time, setTime] = useState(30)
    const [remainingTime, setRemainingTime]=useState(time)
    const [hidden, setHidden]= useState(false)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    return(
            <TypingContextData.Provider value={{hidden, setHidden, time, setTime, remainingTime, setRemainingTime, wpm, setWpm, accuracy, setAccuracy}}>
                {children}
            </TypingContextData.Provider>
    )
}

export default TypingContext;