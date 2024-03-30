import React, { useState, useEffect } from "react";
import "./ScrollButtons.css";

const ScrollButtons = ({ scrollContainerSelector, itemCount }) => {
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const container = document.querySelector(scrollContainerSelector);
        const checkScrollButtons = () => {
            setShowLeftButton(container.scrollLeft > 0);
            setShowRightButton(
                container.scrollLeft <
                    container.scrollWidth - container.clientWidth - 1
            );
        };

        // Перевіряємо при маунті
        checkScrollButtons();

        // Встановлюємо обробник подій для перевірки при скролінгу
        container.addEventListener("scroll", checkScrollButtons);

        // Перевіряємо кожного разу, коли змінюється кількість елементів
        checkScrollButtons();

        return () =>
            container.removeEventListener("scroll", checkScrollButtons);
    }, [scrollContainerSelector, itemCount]);

    const scroll = (direction) => {
        const container = document.querySelector(scrollContainerSelector);
        const scrollAmount = window.innerWidth * 0.7; // 70% screen width scroll
        if (container) {
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {showLeftButton && (
                <button
                    className="scroll-button left"
                    onClick={() => scroll("left")}
                >
                    {"<"}
                </button>
            )}
            {showRightButton && (
                <button
                    className="scroll-button right"
                    onClick={() => scroll("right")}
                >
                    {">"}
                </button>
            )}
        </>
    );
};

export default ScrollButtons;
