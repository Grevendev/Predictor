import type { WeatherType } from "../../types/Weather";

interface WeatherIconProps {
  type: WeatherType;
  size?: number;
}

function WeatherIcon({
  type,
  size = 48,
}: WeatherIconProps) {
  if (type === "clear") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="13"
          fill="currentColor"
        />

        <path
          d="M32 6V14M32 50V58M6 32H14M50 32H58M13.6 13.6L19.2 19.2M44.8 44.8L50.4 50.4M50.4 13.6L44.8 19.2M19.2 44.8L13.6 50.4"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "partlyCloudy") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="23"
          r="10"
          fill="currentColor"
        />

        <path
          d="M24 8V13M24 33V38M9 23H14M34 23H39"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M19 46C19 40.477 23.477 36 29 36C31.021 36 32.902 36.599 34.476 37.63C36.087 33.738 39.938 31 44.429 31C50.378 31 55.2 35.822 55.2 41.771C55.2 42.094 55.185 42.413 55.157 42.728C57.404 43.347 59 45.397 59 47.82C59 50.732 56.639 53.093 53.727 53.093H24C18.477 53.093 14 48.616 14 43.093"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (
    type === "cloudy" ||
    type === "rain" ||
    type === "heavyRain"
  ) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M19 45C19 39.477 23.477 35 29 35C31.021 35 32.902 35.599 34.476 36.63C36.087 32.738 39.938 30 44.429 30C50.378 30 55.2 34.822 55.2 40.771C55.2 41.094 55.185 41.413 55.157 41.728C57.404 42.347 59 44.397 59 46.82C59 49.732 56.639 52.093 53.727 52.093H24C18.477 52.093 14 47.616 14 42.093"
          fill="currentColor"
        />

        {type !== "cloudy" && (
          <>
            <path
              d="M25 57L29 51"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M36 57L40 51"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {type === "heavyRain" && (
              <path
                d="M47 57L51 51"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </>
        )}
      </svg>
    );
  }

  if (type === "snow") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M19 42C19 36.477 23.477 32 29 32C31.021 32 32.902 32.599 34.476 33.63C36.087 29.738 39.938 27 44.429 27C50.378 27 55.2 31.822 55.2 37.771C55.2 38.094 55.185 38.413 55.157 38.728C57.404 39.347 59 41.397 59 43.82C59 46.732 56.639 49.093 53.727 49.093H24C18.477 49.093 14 44.616 14 39.093"
          fill="currentColor"
        />

        <circle cx="26" cy="56" r="2" fill="currentColor" />
        <circle cx="38" cy="56" r="2" fill="currentColor" />
        <circle cx="50" cy="56" r="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 44C18 38.477 22.477 34 28 34C30.021 34 31.902 34.599 33.476 35.63C35.087 31.738 38.938 29 43.429 29C49.378 29 54.2 33.822 54.2 39.771C54.2 40.094 54.185 40.413 54.157 40.728C56.404 41.347 58 43.397 58 45.82C58 48.732 55.639 51.093 52.727 51.093H23C17.477 51.093 13 46.616 13 41.093"
        fill="currentColor"
      />

      <path
        d="M35 10L29 23H37L31 35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default WeatherIcon;