import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { TypingContextData } from "../TypingContext"

const Mid = () => {
    const GlobalData = useContext(TypingContextData)

    const inputRef = useRef(null);  // for input foces 
    const boxRef = useRef(null);    // scroll container
    const charRefs = useRef([]);    // all characters
    let globalIndex = 0;            // for characters index
    const [aiResponse, setAiResponse] = useState('')
    const [para, setPara] = useState([])   //array of array of all dictionaries of letters of each words with state 
    const totalWords = useRef(0)    //Total words in the paragraph
    const wordsLength = useRef([])  //Array of length of each words
    const i = useRef(0)             //for iterating
    const j = useRef(0)             //for iterating

    const [currentIndex, setCurrentIndex] = useState(-1)
    const [typed, setTyped] = useState(0);  //Typed Letters
    const [correct, setCorrect] = useState(0);  //Correct Letters
    const [incorrect, setIncorrect] = useState(0);  //Incorrect Letters

    const startTimer = useRef(0);   //To start timer

    const wpm = useRef(0)           //for wpm calculation
    const accuracy = useRef(0)      //for accuracy calculation

    const [started, setStarted] = useState(false)   //start checck
    const [incorrectLetters, setIncorrectLetters] = useState([])    //array of dictionary of incorrect letters with its count
    const [end, setEnd] = useState(false)   //end check
    const navigate = useNavigate();     //page navigation


    let content = [
        "In today's fast-paced digital world, the ability to type quickly and accurately has become an essential skill for students and professionals alike. Regular practice not only improves speed but also enhances focus, coordination, and overall productivity. By maintaining proper posture, keeping your eyes on the screen, and using all fingers efficiently, you can gradually build confidence and reduce errors. Consistency is the key to mastering typing, and even a few minutes of daily practice can lead to significant improvement over time.",

        "Learning to type efficiently is a valuable skill that improves productivity in both academic and professional environments. With consistent practice, your speed and accuracy will gradually increase, allowing you to focus more on ideas rather than the act of typing itself. Developing proper finger placement and maintaining a steady rhythm are essential habits that lead to long-term improvement.",

        "Technology continues to evolve at a rapid pace, transforming the way people communicate, work, and solve problems. As digital tools become more advanced, the ability to interact with them quickly and accurately becomes increasingly important. Practicing typing regularly not only enhances speed but also strengthens concentration and reduces the likelihood of errors.",

        "In a world driven by information and communication, typing has become one of the most fundamental skills for success. Whether you are writing code, drafting emails, or preparing documents, the ability to express your thoughts quickly can make a significant difference. By focusing on accuracy first and speed later, you can build a strong foundation that will support your progress over time.",

        "Consistency is the key to mastering any skill, and typing is no exception. Even short daily practice sessions can lead to noticeable improvement if done with focus and discipline. Paying attention to posture, minimizing unnecessary movements, and avoiding the habit of looking at the keyboard can help you develop muscle memory and achieve greater efficiency.",

        "Success in typing does not come from rushing but from maintaining a steady and controlled pace. As you become more comfortable with the keyboard, your fingers will naturally begin to move with greater confidence and precision. Over time, this balance of speed and accuracy will allow you to complete tasks more efficiently and with fewer mistakes."
    ]

    const paraToLetters = () => {
        const random = Math.floor(Math.random() * 100);
        const index = random % content.length
        const words = content[index].match(/\S+\s*/g);
        totalWords.current = words.length;
        const letters = words.map(word => {
            wordsLength.current.push(word.length)
            return (word.split("").map(letter => ({ char: letter, state: "Unvisited" })))
        })
        setPara(letters)
    }
    useEffect(()=>{
        GlobalData.setReset(true)
    },[])

    useEffect(() => {
        if (GlobalData.reset){
            setPara([])
            totalWords.current=0
            wordsLength.current=[]
            i.current=0
            j.current=0
            setCurrentIndex(-1)
            setTyped(0)
            setCorrect(0)
            setIncorrect(0)
            wpm.current=0
            accuracy.current=0
            setStarted(false)
            setIncorrectLetters([])
            setEnd(false)
            GlobalData.setTime(30)
            GlobalData.setRemainingTime(GlobalData.time)
            GlobalData.setHidden(false)
            GlobalData.setWpm(0)
            GlobalData.setAccuracy(0)
            clearInterval(startTimer.current);
            paraToLetters()
            setEnd(false)
            GlobalData.setReset(false)
        }
    }, [GlobalData.reset])

    const letterColor = {
        "Unvisited": "text-gray-500",
        "Correct": "text-green-500 bg-green-200/10",
        "Incorrect": "text-red-500 bg-red-200/10"
    }

    const timer = () => setInterval(() => {
        GlobalData.setRemainingTime(prevTime => {
            if (prevTime > 0) return prevTime - 1;
            clearInterval(startTimer.current);
            // setEnd(true)
            return 0;
        });
    }, 1000);

    useEffect(() => {
        if (GlobalData.remainingTime === 0) setEnd(true);
    }, [GlobalData.remainingTime]);

    useEffect(() => {
        wpm.current = (correct * 60 / (GlobalData.time - GlobalData.remainingTime)) / 5
        GlobalData.setWpm(parseInt(wpm.current))
        accuracy.current = correct * 100 / typed
        GlobalData.setAccuracy(parseInt(accuracy.current))
    }, [GlobalData.remainingTime])

    useEffect(() => {
        if (started) {
            startTimer.current = timer();
        }
    }, [started]);

    const handleTyped = (e) => {
        // console.log(e.key,e.keyCode)
        if (GlobalData.remainingTime > 0 && (e.keyCode == 32 || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 188 || e.keyCode == 190 || e.keyCode == 222) || e.keyCode == 189 && !end) {
            setStarted(true)
            GlobalData.setHidden(true)
            setTyped(prev => prev + 1)
            setCurrentIndex((prev) => {
                const next = prev + 1
                handleScroll(next)
                return next
            }
            )

            const copy = [...para]
            if (e.key != copy[i.current][j.current]['char']) {
                const wrong = copy[i.current][j.current]['char']
                if (wrong != " ") {
                    setIncorrectLetters(prev => handleIncorrect(prev, wrong));
                    setIncorrect(prev => prev + 1)
                }
                copy[i.current][j.current]['state'] = "Incorrect"
            } else {
                setCorrect(prev => prev + 1)

                copy[i.current][j.current]['state'] = "Correct"
            }
            setPara(copy)
            if (i.current < totalWords.current) {
                if (j.current < wordsLength['current'][i.current] - 1) {
                    j.current++
                } else {
                    i.current++
                    j.current = 0
                }
            }
            if (i.current == totalWords.current) setEnd(true)

        }
        else if (e.keyCode == 8) {
            setCurrentIndex((prev) => {
                const next = prev - 1
                handleScroll(next)
                return next
            }
            )
            if (j.current > 0) {
                j.current--
            } else if (j.current == 0 && i.current > 0) {
                i.current--
                j.current = wordsLength['current'][i.current] - 1
            }

            const copy = [...para]
            copy[i.current][j.current]['state'] = "Unvisited"
            setPara(copy)
        }
        if (para.slice(-1)[0].slice(-1)[0]['state'] == "Correct") {
            clearInterval(startTimer.current)
            setEnd(true)
        }
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    }

    const handleIncorrect = (arr, char) => {
        const exist = arr.find(item => item.char === char)
        if (exist) {
            return arr.map(item =>
                item.char == char
                    ? { ...item, count: item.count + 1 }
                    : item
            );
        }
        else {
            return [...arr, { char, count: 1 }];
        }
    }

    const handleScroll = (index) => {
        // console.log("scroll check", index);
        const current = charRefs.current[index];
        const prev = charRefs.current[index - 1];

        if (!current || !prev) return;

        const currentTop = current.offsetTop;
        const prevTop = prev.offsetTop;

        // ✅ Line changed
        if (currentTop !== prevTop) {
            boxRef.current.scrollTo({
                top: currentTop - 40, // adjust based on UI
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (end){
            clearInterval(startTimer.current);
            navigate("/result", { state: { "WPM": wpm.current, "Accuracy": accuracy.current, "Incorrect": incorrect, "IncorrectLetters": incorrectLetters } })
        } 
    }, [end])



    return (
        <div className="text-white min-w-3/4">
            <div className="shadow-sm shadow-[hsl(142,71%,45%)] rounded-2xl max-w-5xl m-auto mb-8 relative">
                <div
                    tabIndex="0"
                    onKeyDown={handleTyped}
                    ref={inputRef}
                >
                </div>
                <div id="typing-box" ref={boxRef} className="flex flex-wrap gap-0.5 text-3xl font-light font-mono h-64 py-4 overflow-y-auto mx-16 my-8" onClick={() => { inputRef.current.focus() }}>
                    {para.map((word, Wid) => {
                        return (
                            <span key={Wid} className='flex'>
                                {word.map((letter, Lid) => {
                                    const index = globalIndex++;
                                    return (
                                        <span key={Lid}
                                            ref={(el) => (charRefs.current[index] = el)}
                                            className={`${letterColor[letter['state']]} rounded px-0.5 whitespace-pre`}>{letter["char"]}</span>
                                    )
                                }
                                )
                                }
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>


    )
}

export default Mid;