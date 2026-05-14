const Tile = (props) =>{
    return(
        <div className="text-white">
            <div className="rounded-2xl m-4 px-6 py-4 w-36 flex flex-col items-center gap-2 bg-gray-900">
                {props.logo}
                <h2 className="text-4xl font-mono">{props.num}<span className="text-2xl">{(props.text=="Accuracy")?"%":""}</span></h2>
                <h2 className="text-gray-400">{props.text}</h2>
            </div>
        </div>
    )
}

export default Tile;