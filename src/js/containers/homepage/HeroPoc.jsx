import React, { useRef } from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    // <Download> government spending by who receives money
    // <Track> government spending <by who receives money>
    // Track government spending <by who gives money>
    // The official source of government spending data.

    const downloadRef = useRef(null);
    const trackRef = useRef(null);

    setInterval(() => {
        setTimeout(() => {
            trackRef.current.classList.remove("fadeOut");
            downloadRef.current.classList.remove("slideRight");
            downloadRef.current.classList.add("fadeOut");
            trackRef.current.classList.add("slideRight");
            setTimeout(() => {
                downloadRef.current.classList.remove("fadeOut");
                trackRef.current.classList.remove("slideRight");
                trackRef.current.classList.add("fadeOut");
                downloadRef.current.classList.add("slideRight");
            }, 2000);
        }, 2000);
    }, 5000);

    return (
        <section className="wrapper">
            <h2 className="sentence">
                <div className="leftWords">
                    <span ref={downloadRef} className="download">
                        Download
                    </span>
                    <span ref={trackRef} className="track">
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
