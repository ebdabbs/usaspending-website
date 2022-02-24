import React, { useRef } from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    // <Download> government spending by who receives money
    // <Track> government spending <by who receives money>
    // Track government spending <by who gives money>
    // The official source of government spending data.

    const downloadRef = useRef(null);
    const trackRef = useRef(null);

    const switchLeft = (show, hide) => {
        hide.classList.add("hero_fadeOut");
        hide.classList.remove("hero_show");
        hide.classList.remove("hero_slideRight");
        show.classList.remove("hero_fadeOut");
        show.classList.add("hero_show");
        setTimeout(() => {
            show.classList.add("hero_slideRight"); // must be slightly after out of view
        }, 1);
    };

    // first cycle
    setTimeout(() => {
        switchLeft(trackRef.current, downloadRef.current);
    }, 2000);

    // timed from then on
    setInterval(() => {
        setTimeout(() => {
            switchLeft(downloadRef.current, trackRef.current);
        }, 2000);
        setTimeout(() => {
            switchLeft(trackRef.current, downloadRef.current);
        }, 6000);
    }, 10000);

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

                <div class="slideLeft">
                    <span>by who receives money</span>
                    <span>by who gives money</span>
                </div>
            </h2>
        </section>
    );
};

export default HeroPoc;
