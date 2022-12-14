import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import HeaderComponent from './Components/Header/HeaderComponent';
import HomeViewComponent from './Views/Home/HomeView';
import AboutView from './Views/About/AboutView';
import ContactView from './Views/Contact/ContactView';

import ErrorView from './Views/Error/ErrorView';
import FooterComponent from './Components/Footer/FooterComponent';
function App() {
  return (
    <Router>
      <div className="container--fluid">
        <HeaderComponent />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomeViewComponent />} exact />
            <Route path="/about" element={<AboutView />} exact />
            <Route path="/contact" element={<ContactView />} exact />
            <Route path="*" element={<ErrorView />} exact />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
