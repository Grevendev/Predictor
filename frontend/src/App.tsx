import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    function handleLocationChange() {
      setCurrentPath(window.location.pathname);
    }

    // Lyssna på när användaren klickar bakåt/framåt i webbläsaren
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Ta bort eventuell base-path (t.ex. /predictor) så kontrollen fungerar både lokalt och på VPS
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = currentPath.startsWith(basePath)
    ? currentPath.slice(basePath.length) || "/"
    : currentPath;

  if (normalizedPath === "/about") {
    return <AboutPage />;
  }

  if (normalizedPath === "/how-it-works") {
    return <HowItWorksPage />;
  }

  return <LandingPage />;
}

export default App;