import React from "react";
import { Img } from "remotion";

// Using a high-quality SVG path for a standard arrow cursor
// This mimics the standard macOS/Windows pointer
export const MouseCursor: React.FC<{
    style?: React.CSSProperties;
}> = ({ style }) => {
    return (
        <div style={{ ...style, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", overflow: "visible" }}
            >
                <path
                    d="M0 0 L10 24 L14.5 16 L22 23 L25 20 L17.5 13 L25 9 L0 0 Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};
