import Top from "./Top";
import Mid from "./Mid";
import Bottom from "./Bottom"
import { useEffect, useState } from "react";


const Home = ({setResult}) =>{
    const [remainingTime, setRemainingTime]=useState(0)


    return(
        <div className="flex items-center flex-col gap-3 py-10">
            <Top />
            <Mid />
            <Bottom />
        </div>
    )
}

export default Home;