import { useEffect, useState } from "react";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function toggleVisibility() {
            // Visa knappen först när man scrollat förbi 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    function scrollToSearch() {
        // Scrollar mjukt till toppen där sökformuläret ligger
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        // Sätt gärna fokus direkt i sökfältet igen
        const input = document.getElementById("city") as HTMLInputElement | null;
        if (input) {
            setTimeout(() => input.focus(), 300);
        }
    }

    if (!isVisible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={scrollToSearch}
            aria-label="Scrolla upp till sök"
            className="
        fixed
        bottom-7
        right-7
        z-50
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text)]
        shadow-[var(--shadow)]
        backdrop-blur-md
        transition-all
        duration-200
        ease-in-out
        hover:-translate-y-1
        hover:border-[var(--text-muted)]
        hover:bg-[var(--surface-soft)]
        hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]
        active:translate-y-0
        focus:outline-none
        focus:ring-2
        focus:ring-[var(--text)]
        max-[480px]:bottom-5
        max-[480px]:right-5
        max-[480px]:h-11
        max-[480px]:w-11
      "
        >
            <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    );
}

export default ScrollToTopButton;