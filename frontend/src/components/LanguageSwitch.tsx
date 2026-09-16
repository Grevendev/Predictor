import { useLanguage } from "../context/LanguageContext";

function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  const isSwedish = language === "sv";

  return (
    <button
      className="
        inline-flex
        h-[38px]
        w-[38px]
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[1.25rem]
        leading-none
        transition
        duration-200
        ease-in-out
        hover:-translate-y-px
        hover:bg-[var(--surface-soft)]
        active:translate-y-0
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-[var(--text)]
        focus-visible:outline-offset-[3px]
        max-[700px]:h-[44px]
        max-[700px]:w-[44px]
      "
      type="button"
      onClick={toggleLanguage}
      aria-label={
        isSwedish
          ? "Byt till engelska"
          : "Switch to Swedish"
      }
      title={
        isSwedish
          ? "Byt till engelska"
          : "Byt till svenska"
      }
    >
      <span aria-hidden="true">
        {isSwedish ? "🇸🇪" : "🇬🇧"}
      </span>
    </button>
  );
}

export default LanguageSwitch;