import { SpeechProvider } from "./contexts/SpeechContext";
import { CookieNotice } from "./layout/CookieNotice";
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
