const LetterTile = (prop) =>{


    return (
        <div className="text-white">
            <div className="rounded-2xl m-2 px-4 py-2 w-16 flex flex-col items-center bg-gray-700">
                <h2 className="text-3xl font-mono whitespace-pre">{prop.char}</h2>
                <h2 className="text-gray-400">{prop.count}x</h2>
            </div>
        </div>
    )
}

export default LetterTile;