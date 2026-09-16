import { useState } from "react";

import { useLanguage } from "../context/LanguageContext";

interface SearchFormProps {
  onSearch: (city: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [city, setCity] = useState("");
  const { translations: t } = useLanguage();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
    setCity("")
  }

  return (
    <form
      className="
        mx-auto
        flex
        w-full
        max-w-[680px]
        items-end
        gap-3
        rounded-[18px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-[10px]
        shadow-[var(--shadow)]
        transition
        duration-250
        ease-in-out
        max-[480px]:flex-col
        max-[480px]:items-stretch
        max-[480px]:p-2
      "
      onSubmit={handleSubmit}
    >
      <label
        className="
          absolute
          h-px
          w-px
          overflow-hidden
          whitespace-nowrap
          border-0
          p-0
          [-webkit-clip-path:inset(50%)]
          [clip-path:inset(50%)]
        "
        htmlFor="city"
      >
        {t.hero.cityLabel}
      </label>

      <input
        className="
          min-w-0
          flex-1
          rounded-xl
          border
          border-transparent
          bg-[var(--input-background)]
          px-[18px]
          text-[var(--text)]
          outline-none
          transition
          duration-200
          ease-in-out
          placeholder:text-[0.9rem]
          placeholder:tracking-[0.08em]
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--text-muted)]
          focus:bg-[var(--surface)]
          focus:shadow-[0_0_0_4px_rgba(127,140,160,0.12)]
          max-[480px]:h-[52px]
        "
        id="city"
        name="city"
        type="text"
        placeholder={t.hero.cityPlaceholder}
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <button
        className="
          h-14
          rounded-xl
          border-0
          bg-[var(--button)]
          px-7
          font-[650]
          text-[var(--background)]
          transition
          duration-200
          ease-in-out
          hover:-translate-y-px
          hover:bg-[var(--button-hover)]
          hover:shadow-[0_8px_20px_rgba(23,32,51,0.16)]
          active:translate-y-0
          max-[480px]:h-[52px]
          max-[480px]:w-full
          max-[480px]:px-5
        "
        type="submit"
      >
        {t.hero.search}
      </button>
    </form>
  );
}

export default SearchForm;