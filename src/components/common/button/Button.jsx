import React from "react";
import clsx from "clsx";
import "./Button.css";

export default function Button({ children, icon, dark = false, ...props }) {
    const buttonClass = clsx("button", { "button-dark": dark });
    return (
        <button className={buttonClass} {...props}>
            {icon && <img src={icon} className="button-icon" alt="plus icon" />}
            {children}
        </button>
    );
}
