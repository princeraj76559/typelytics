import { useContext } from "react";
import {useNavigate} from "react-router-dom";   

const PageNotFound = () => {
    const navigate = useNavigate();
    return(
        <h2 className="text-white text-3xl">You hit the wrong url.<br/>Go to <span onClick={() =>navigate("/")} 
        className="text-blue-500 cursor-pointer">Home</span></h2>
    )
}

export default PageNotFound;