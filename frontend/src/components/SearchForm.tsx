import { useState } from "react";

interface SearchFormProps {
  onSearch: (city: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [city, setCity] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">
        Stad
      </label>

      <input
        id="city"
        name="city"
        type="text"
        placeholder="STAD"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <button type="submit">
        Sök
      </button>
    </form>
  );
}

export default SearchForm;