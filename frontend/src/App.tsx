import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const path = window.location.pathname;

  if (path === "/about") {
    return <AboutPage />;
  }

  return <LandingPage />;
}

export default App;