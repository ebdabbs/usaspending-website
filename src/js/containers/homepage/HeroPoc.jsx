import React from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    // <Download> government spending by who receives money
    // <Track> government spending <by who receives money>
    // Track government spending <by who gives money>
    // The official source of government spending data.

    const slide = ((e) => e.target.classList.add("shrink"));

    return (
        <section className="wrapper">
            <h2 className="sentence">
                <div className="fromLeft">
                    <span className="download" onClick={slide}>Download</span>
                    <span className="track" onClick={slide}>Track</span>
                </div>
                government spending by who receives money
                {/* <div className="slidingVertical">
                    <span>Amazing.</span>
                    <span>Beautiful.</span>
                    <span>Cute.</span>
                    <span>Delightful.</span>
                    <span>Emotional.</span>
                </div> */}
            </h2>

            {/* <h2 className="sentence">
                Amanda looks very
                <div className="slidingHorizontal">
                    <span>Cool.</span>
                    <span>Elegant.</span>
                    <span>Beautiful.</span>
                    <span>Different.</span>
                    <span>Intelligent.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Five good examples of Adjectives are
                <div className="fadeIn">
                    <span>Handsome.</span>
                    <span>Clean.</span>
                    <span>Elegant.</span>
                    <span>Magnificent.</span>
                    <span>Adorable.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Vertical Animation seems very
                <div className="verticalFlip">
                    <span>Nice.</span>
                    <span>Effective.</span>
                    <span>Horrible.</span>
                    <span>Magnificent.</span>
                    <span>Adorable.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Horizontal Animation looks very
                <div className="horizontalFlip">
                    <span>Dirty.</span>
                    <span>Funny.</span>
                    <span>Amazing.</span>
                    <span>Boring.</span>
                    <span>Brilliant.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Maybe this Pen is not so
                <div className="antiClock">
                    <span>Amazing.</span>
                    <span>Magnificent.</span>
                    <span>Adorable.</span>
                    <span>Clean.</span>
                    <span>Elegant.</span>
                </div>
            </h2>

            <h2 className="sentence">
                5 Best Browsers are
                <div className="clockWise">
                    <span>Chrome.</span>
                    <span>Safari.</span>
                    <span>Firefox.</span>
                    <span>Opera.</span>
                    <span>IE.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Pop Effect looks very
                <div className="popEffect">
                    <span>Handsome.</span>
                    <span>Clean.</span>
                    <span>Elegant.</span>
                    <span>Magnificent.</span>
                    <span>Adorable.</span>
                </div>
            </h2>

            <h2 className="sentence">
                Push Effect is not
                <div className="pushEffect">
                    <span>Boring.</span>
                    <span>Funny.</span>
                    <span>Brilliant.</span>
                    <span>Dirty.</span>
                    <span>Amazing.</span>
                </div>
            </h2> */}
        </section>
    );
};

export default HeroPoc;
