import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import ListPage from "./components/ListPage.jsx";
import HomePage from "./components/HomePage.jsx";
import Header from "./components/Header.jsx";
import useAutoLogout from "./hooks/AutoLogout.jsx";
import SessionWarningModal from "./components/SessionWarningModal.jsx";

const AppWrapper = () => {
  const showWarning = useAutoLogout(10 * 60 * 1000); // 10 mili sec * 60 sec * 1000 = 10 min

  const location = useLocation();
  const hiddenHeaderOn = ["/"];
  const showHeader = !hiddenHeaderOn.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      {showWarning && <SessionWarningModal />}
      <div
        className={`${
          showHeader && "pt-16 overflow-y-auto "
        } bg-page/30 h-screen`}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
