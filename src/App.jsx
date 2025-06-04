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
import SessionWarningModal from "./components/SessionWarningModal.jsx";
import CountdownTimer from "./components/CountdownTimer.jsx";
import { useSelector } from "react-redux";

const AppWrapper = () => {
  const userInfo = useSelector((state) => state.user);
  const timeLeft = useSelector((state) => state.countdown.timeLeft);

  const location = useLocation();
  const hiddenHeaderOn = ["/"];
  const showHeader = !hiddenHeaderOn.includes(location.pathname);
  console.log(timeLeft);

  return (
    <>
      {showHeader && <Header />}
      {userInfo?.username && <CountdownTimer />}
      {timeLeft <= 800 && userInfo?.username && <SessionWarningModal />}
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
