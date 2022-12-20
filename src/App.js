import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import HeaderComponent from './Components/Header/HeaderComponent';
import FooterComponent from './Components/Footer/FooterComponent';
import SpinnerComponent from './Components/Spinner/SpinnerComponent';

const HomeView = lazy(() => import('./Views/Home/HomeView'));
const AboutView = lazy(() => import('./Views/About/AboutView'));
const ContactView = lazy(() => import('./Views/Contact/ContactView'));
const ErrorView = lazy(() => import('./Views/Error/ErrorView'));
const FormsView = lazy(() => import('./Views/Forms/FormsView'));
const PasswordResetLinkView = lazy(() =>
  import('./Views/PasswordResetLink/PasswordResetLinkView'),
);

function App() {
  return (
    <Router>
      <div className="container--fluid">
        <HeaderComponent />
        <Suspense fallback={<SpinnerComponent />}>
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomeView />} exact />
              <Route path="/about" element={<AboutView />} exact />
              <Route path="/contact" element={<ContactView />} exact />
              <Route path="/forms" element={<FormsView />} exact />
              <Route
                path="/password-reset/:token"
                element={<PasswordResetLinkView />}
              />
              <Route path="*" element={<ErrorView />} exact />
            </Routes>
          </div>
        </Suspense>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
