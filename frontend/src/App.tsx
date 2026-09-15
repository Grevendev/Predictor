import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";

function App() {
  const path = window.location.pathname;

  if (path === "/about") {
    return <AboutPage />;
  }

  if (path === "/how-it-works") {
    return <HowItWorksPage />;
  }

  return <LandingPage />;
}

export default App;