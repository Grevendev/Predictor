import type { WeatherType } from "../../types/Weather";

interface WeatherIconProps {
  type: WeatherType;
  size?: number;
}

function WeatherIcon({
  type,
  size = 48,
}: WeatherIconProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    "aria-hidden": true,
  };

  if (type === "clear") {
    return (
      <svg {...commonProps}>
        <circle
          cx="32"
          cy="32"
          r="12"
          fill="currentColor"
        />

        <path
          d="
            M32 6V13
            M32 51V58
            M6 32H13
            M51 32H58
            M13.6 13.6L18.5 18.5
            M45.5 45.5L50.4 50.4
            M50.4 13.6L45.5 18.5
            M18.5 45.5L13.6 50.4
          "
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "partlyCloudy") {
    return (
      <svg {...commonProps}>
        <circle
          cx="25"
          cy="23"
          r="10"
          fill="currentColor"
        />

        <path
          d="
            M25 8V13
            M25 33V38
            M10 23H15
            M35 23H40
          "
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="
            M18 47
            C18 41.477 22.477 37 28 37
            C30.021 37 31.902 37.599 33.476 38.63
            C35.087 34.738 38.938 32 43.429 32
            C49.378 32 54.2 36.822 54.2 42.771
            C54.2 43.094 54.185 43.413 54.157 43.728
            C56.404 44.347 58 46.397 58 48.82
            C58 51.732 55.639 54.093 52.727 54.093
            H23
            C17.477 54.093 13 49.616 13 44.093
          "
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "cloudy") {
    return (
      <svg {...commonProps}>
        <path
          d="
            M18 46
            C18 40.477 22.477 36 28 36
            C30.021 36 31.902 36.599 33.476 37.63
            C35.087 33.738 38.938 31 43.429 31
            C49.378 31 54.2 35.822 54.2 41.771
            C54.2 42.094 54.185 42.413 54.157 42.728
            C56.404 43.347 58 45.397 58 47.82
            C58 50.732 55.639 53.093 52.727 53.093
            H23
            C17.477 53.093 13 48.616 13 43.093
          "
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "rain") {
    return (
      <svg {...commonProps}>
        <path
          d="
            M18 40
            C18 34.477 22.477 30 28 30
            C30.021 30 31.902 30.599 33.476 31.63
            C35.087 27.738 38.938 25 43.429 25
            C49.378 25 54.2 29.822 54.2 35.771
            C54.2 36.094 54.185 36.413 54.157 36.728
            C56.404 37.347 58 39.397 58 41.82
            C58 44.732 55.639 47.093 52.727 47.093
            H23
            C17.477 47.093 13 42.616 13 37.093
          "
          fill="currentColor"
        />

        <path
          d="M25 54L28 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M37 54L40 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M49 54L52 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "heavyRain") {
    return (
      <svg {...commonProps}>
        <path
          d="
            M17 39
            C17 33.477 21.477 29 27 29
            C29.021 29 30.902 29.599 32.476 30.63
            C34.087 26.738 37.938 24 42.429 24
            C48.378 24 53.2 28.822 53.2 34.771
            C53.2 35.094 53.185 35.413 53.157 35.728
            C55.404 36.347 57 38.397 57 40.82
            C57 43.732 54.639 46.093 51.727 46.093
            H22
            C16.477 46.093 12 41.616 12 36.093
          "
          fill="currentColor"
        />

        <path
          d="M21 54L24 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M32 56L35 50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M43 54L46 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M54 54L57 49"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "snow") {
    return (
      <svg {...commonProps}>
        <path
          d="
            M18 40
            C18 34.477 22.477 30 28 30
            C30.021 30 31.902 30.599 33.476 31.63
            C35.087 27.738 38.938 25 43.429 25
            C49.378 25 54.2 29.822 54.2 35.771
            C54.2 36.094 54.185 36.413 54.157 36.728
            C56.404 37.347 58 39.397 58 41.82
            C58 44.732 55.639 47.093 52.727 47.093
            H23
            C17.477 47.093 13 42.616 13 37.093
          "
          fill="currentColor"
        />

        <circle
          cx="24"
          cy="54"
          r="2.2"
          fill="currentColor"
        />

        <circle
          cx="36"
          cy="54"
          r="2.2"
          fill="currentColor"
        />

        <circle
          cx="48"
          cy="54"
          r="2.2"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "thunderstorm") {
    return (
      <svg {...commonProps}>
        <path
          d="
            M17 38
            C17 32.477 21.477 28 27 28
            C29.021 28 30.902 28.599 32.476 29.63
            C34.087 25.738 37.938 23 42.429 23
            C48.378 23 53.2 27.822 53.2 33.771
            C53.2 34.094 53.185 34.413 53.157 34.728
            C55.404 35.347 57 37.397 57 39.82
            C57 42.732 54.639 45.093 51.727 45.093
            H22
            C16.477 45.093 12 40.616 12 35.093
          "
          fill="currentColor"
        />

        <path
          d="M35 36L29 47H36L31 58L43 44H36L41 36H35Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path
        d="
          M18 45
          C18 39.477 22.477 35 28 35
          C30.021 35 31.902 35.599 33.476 36.63
          C35.087 32.738 38.938 30 43.429 30
          C49.378 30 54.2 34.822 54.2 40.771
          C54.2 41.094 54.185 41.413 54.157 41.728
          C56.404 42.347 58 44.397 58 46.82
          C58 49.732 55.639 52.093 52.727 52.093
          H23
          C17.477 52.093 13 47.616 13 42.093
        "
        fill="currentColor"
      />
    </svg>
  );
}

export default WeatherIcon;