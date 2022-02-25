import React, { useRef } from "react";
import "./HeroPoc.scss";

// Stephanie had a clever thought to include the css as code, to dymanically update with positions, sizes, etc

const HeroPoc = () => {
    let pause = false;

    const downloadRef = useRef(null);
    const trackRef = useRef(null);
    const receivesRef = useRef(null);
    const givesRef = useRef(null);

    const switchLeft = (show, hide) => {
        hide.classList.add("hero_fadeOut");
        hide.classList.remove("hero_hideLeft");
        hide.classList.remove("hero_slide");
        show.classList.remove("hero_fadeOut");
        show.classList.add("hero_hideLeft");
        setTimeout(() => {
            show.classList.add("hero_slide"); // must be after displaying out of view
        }, 1);
    };

    // these two can be combined in a clever way, I just don't want to confuse the thinking

    const switchRight = (show, hide) => {
        hide.classList.add("hero_fadeOut");
        hide.classList.remove("hero_hideRight");
        hide.classList.remove("hero_slide");
        show.classList.remove("hero_fadeOut");
        show.classList.add("hero_hideRight");
        setTimeout(() => {
            show.classList.add("hero_slide"); // must be after displaying out of view
        }, 1);
    };

    const cycleSec = 12;
    function cycleWords() {

        console.log(pause); // debug: why is this showing more than the page timing? and what changes it back to false?

        // switch start & end of sentence
        if (!pause) {
            switchLeft(trackRef.current, downloadRef.current);
        }
        if (!pause) {
            setTimeout(switchRight, cycleSec * 300, givesRef.current, receivesRef.current);
        }
        if (!pause) {
            setTimeout(switchRight, cycleSec * 500, receivesRef.current, givesRef.current);
        }
        if (!pause) {
            setTimeout(switchLeft, cycleSec * 700, downloadRef.current, trackRef.current);
        }

        // scroll in static phrase

        // might need a "reset" function to the initial state?

        setTimeout(cycleWords, cycleSec * 1000); // repeat every cycleSec seconds
    }

    // initial delay, make sure refs are settled
    setTimeout(cycleWords, 2000);

    return (
        <section className="wrapper">
            <h2 className="sentence">
                <div className="leftWords">
                    <span ref={downloadRef}>Download</span>
                    <span ref={trackRef} className="hero_fadeOut">
                        Track
                    </span>
                </div>
                <span className="staticBlock">government spending</span>

                <div class="rightWords">
                    <span ref={receivesRef}>by who receives money</span>
                    <span ref={givesRef} className="hero_fadeOut">
                        by who gives money
                    </span>
                </div>
            </h2>
            <button
                onClick={() => {
                    pause = !pause;
                }}>
                Pause/Resume
            </button>
        </section>
    );
};

export default HeroPoc;
