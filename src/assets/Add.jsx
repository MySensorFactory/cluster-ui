import * as React from "react";
const SVGComponent = (props) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="Edit / Add_Plus">
            <path
                id="Vector"
                d="M6 12H12M12 12H18M12 12V18M12 12V6"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);
export default SVGComponent;
