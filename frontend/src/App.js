import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { FaRobot } from 'react-icons/fa'; // Import the chatbot icon
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Positions from "./pages/positions/Positions";
import Account from "./pages/account/Account";
import Signup from "./pages/authentication/signup/Signup";
import Signin from "./pages/authentication/signin/Signin";
import Tools from "./pages/tools/Tools";
import TradingChart from "./pages/tradingChart/TradingChart";
import Learn from "./learn/Learn"; // Update the import path
import Taxes from "./pages/taxes/Taxes";
import MyWatchlist from "./pages/mywatchlist/MyWatchlist";
import Calculator from "./pages/calculator/Calculator";
import home from "./pages/home/home";

function App() {
  const handleButtonClick = () => {
    window.open('https://growup-stock-market.streamlit.app/', '_blank');
  };
  const handleButtonClick1 = () => {
    window.open('https://chatb-ot.streamlit.app/', '_blank');
  };
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route>
            <Route path="/abc" element={<home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/account" element={<Account />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/chart" element={<TradingChart />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/watchlist" element={<MyWatchlist />} />
            <Route path="/calculator" element={<Calculator/>}/>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <div className="buttons-container">
      <button className="floating-button" onClick={handleButtonClick}>
        Click To Predict
      </button>

      {/* Chatbot icon instead of the button */}
      <div className="chatbot-icon" onClick={handleButtonClick1}>
        <FaRobot size={30} color="#fff" />
      </div>
      </div>
    </div>
  );
}

export default App;
