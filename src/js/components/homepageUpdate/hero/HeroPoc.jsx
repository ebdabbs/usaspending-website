import React, { useState, useEffect } from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    const [paused, togglePaused] = useState(true);
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['over time', 'by agency', 'by recipient', 'to communities', 'by industry', 'on contracts', 'on grants', 'by state'];

    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const rotatingWords = {
        left: {
            index: null,
            previousWord: null,
            wordsArray: [...leftWords],
            tempWordsArray: [...leftWords]
        },
        right: {
            index: null,
            previousWord: null,
            wordsArray: [...rightWords],
            tempWordsArray: [...rightWords]
        }
    };

    const pickWord = (position) => {
        console.log(rotatingWords[position]);
        // const {
        //     index, previousWord, wordsArray
        // } = rotatingWords[position];

        if (rotatingWords[position].previousWord) {
            rotatingWords[position].tempWordsArray.splice(rotatingWords[position].tempWordsArray.indexOf(rotatingWords[position].tempWordsArray[rotatingWords[position].index]), 1);
        }

        if (rotatingWords[position].tempWordsArray?.length === 0) {
            rotatingWords[position].tempWordsArray = [...rotatingWords[position].wordsArray];
        }

        do {
            rotatingWords[position].index = getRandomInt(rotatingWords[position].tempWordsArray.length);
        } while (rotatingWords[position].previousWord === rotatingWords[position].tempWordsArray[rotatingWords[position].index]);

        rotatingWords[position].previousWord = rotatingWords[position].tempWordsArray[rotatingWords[position].index];
        return rotatingWords[position].index;
    };

    useEffect(() => {
        togglePaused(false);
    }, []);

    return (
        <div style={{ "margin-bottom": "4rem" }}>
            <h2 className="sentence hero__temp-h1">
                {!paused ?
                    <>
                        <div className="leftWords initialVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}</span>
                        </div>
                        <div className="leftWords slidingVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}</span>
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}</span>
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}</span>
                        </div>
                        <div className="leftWords finalVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}</span>
                        </div>

                    </>
                    :
                    <div className="leftWords">
                        <span>{rotatingWords.left.tempWordsArray[rotatingWords.left.index]}</span>
                    </div>
                }
                <div className="staticBlock">government spending</div>

                {!paused ?
                    <>
                        <div className="rightWords initialVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                        <div className="rightWords slidingVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                        <div className="rightWords finalVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                    </>
                    :
                    <div className="rightWords">
                        <span>{rotatingWords.right.tempWordsArray[rotatingWords.right.index]}</span>
                    </div>
                }
            </h2>
            <div style={{ clear: "both" }} />
        </div>
    );
};

export default HeroPoc;
