import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    return (
        <main className="main">
            <nav className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt=""/>
            </nav>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Abhi</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card"
                                 onClick={() => setInput("Recommend scenic destinations for an upcoming road trip")}>
                                <p>Recommend scenic destinations for an upcoming road trip</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Give a brief summary of city development and infrastructure planning")}>
                                <p>Briefly summarize this concept:Data Mining and its feature</p>
                                <img src={assets.bulb_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Generate ideas for team-building activities during our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt=""/>
                            </div>
                            <div className="card" onClick={() => setInput("Tell me about MERN stack and Angular")}>
                                <p>Explain about MERN stack web developmet and its important</p>
                                <img src={assets.code_icon} alt=""/>
                            </div>
                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className="result-data-icon" src={assets.gemini_icon} alt=""/>
                            {loading ?
                                <div className='loader'>
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                                  onKeyUp={(e) => {
                                      if (e.key === 'Enter') {
                                          onSent();
                                      }
                                  }}
                                  value={input}
                                  type="text"
                                  placeholder="Enter a prompt here"
                        />
                        <div className="icon-container">
                            <button><img src={assets.gallery_icon} alt=""/></button>
                            <button><img src={assets.mic_icon} alt=""/></button>
                            <button type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt=""/></button>
                        </div>
                    </div>
                    <p className="bottom-info">
                    Gemini's responses may contain inaccuracies, including information about people. Please verify the details.
                        <a href="#">Your privacy and Gemini Apps</a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;
