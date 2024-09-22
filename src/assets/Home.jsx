import * as React from "react";
const SVGComponent = (props) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fill="#FFFFFF"
            d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
        />
    </svg>
);
export default SVGComponent;
