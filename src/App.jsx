import { lazy, Suspense, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import HeaderComponent from './Components/Header/HeaderComponent';
import FooterComponent from './Components/Footer/FooterComponent';
import SpinnerComponent from './Components/Spinner/SpinnerComponent';
import {
  applyAccent,
  getLastStoredAccent,
  getStoredAccent,
} from './Utils/accentTheme';

const HomeView = lazy(() => import('./Views/Home/HomeView'));
const MemoriesView = lazy(() => import('./Views/Memories/MemoriesView'));
const AboutView = lazy(() => import('./Views/About/AboutView'));
const ContactView = lazy(() => import('./Views/Contact/ContactView'));
const ErrorView = lazy(() => import('./Views/Error/ErrorView'));
const FormsView = lazy(() => import('./Views/Forms/FormsView'));
const PasswordResetLinkView = lazy(() =>
  import('./Views/PasswordResetLink/PasswordResetLinkView'),
);
const UserAdminView = lazy(() => import('./Views/UserAdmin/UserAdminView'));

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector(
    (state) => state.googleUserLogin,
  );
  const { userDetails } = useSelector((state) => state.userInfoDetails);
  const authInfo = userInfo || googleUserInfo;

  useLayoutEffect(() => {
    applyAccent(
      authInfo
        ? getStoredAccent(authInfo, userDetails)
        : getLastStoredAccent(),
    );
  }, [authInfo, userDetails]);

  return (
    <Router>
      <div className="container--fluid">
        <HeaderComponent />
        <Suspense fallback={<SpinnerComponent />}>
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/memories" element={<MemoriesView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/contact" element={<ContactView />} />
              <Route path="/forms" element={<FormsView />} />
              <Route path="/user-admin" element={<UserAdminView />} />
              <Route
                path="/password-reset/:token"
                element={<PasswordResetLinkView />}
              />
              <Route path="*" element={<ErrorView />} />
            </Routes>
          </div>
        </Suspense>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
