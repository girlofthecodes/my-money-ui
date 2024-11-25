import React from "react";

export const VideoComponent = ({videoSrc}) => {
    return (
        <div className="videoContainer">
            <video width="600" autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
}; 