import { SpeechProvider } from "./contexts/SpeechContext";
import { CookieNotice } from "./components/CookieNotice";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <SpeechProvider>
      <CookieNotice />
      <ScrollRestoration />
      <Outlet />
    </SpeechProvider>
  );
}

export default App;
