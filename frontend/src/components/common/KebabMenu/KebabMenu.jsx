import React, { useState, useRef, useEffect } from "react";
import kebabIcon from "../../../assets/icons/kebabIcon.svg";
import "./KebabMenu.css";

const KebabMenu = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const menuRef = useRef();

    const togglePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="kebab-menu-container" ref={menuRef}>
            <button className="kebab-menu-button" onClick={togglePopup}>
                <img className="kebab-icon" src={kebabIcon} alt="menu" />
            </button>
            {isPopupOpen && <div className="popup-menu">{children}</div>}
        </div>
    );
};

export default KebabMenu;
