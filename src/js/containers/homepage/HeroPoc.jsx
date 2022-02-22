import React from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    // <Download> government spending by who receives money
    // <Track> government spending <by who receives money>
    // Track government spending <by who gives money>
    // The official source of government spending data.

    const shrink = (e) => e.target.classList.add("shrink");

    return (
        <section className="wrapper">
            <h2 className="sentence">
                <div className="fromLeft">
                    <span className="download" onClick={shrink}>
                        Download
                    </span>
                    <span className="track" onClick={shrink}>
                        Track
                    </span>
                </div>
                government spending by who receives money
            </h2>

        </section>
    );
};

export default HeroPoc;
