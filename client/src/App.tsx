import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './ui-kit/theme';
import NavBar from './components/NavBar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import type { AppDispatch, RootState } from './redux/store/redux.store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/slices/userSlice';
import MainPage from './Pages/MainPage';
import AboutUs from './Pages/AboutUs';
import Team from './Pages/Team';
import Projects from './Pages/Projects';
import Services from './Pages/Services';
import { LawyerProfile } from './Pages/LawyerProfile';
import VerifyEmail from './Pages/verifyEmail';
import Profile from './Pages/Profile';
import { ConsultationForm } from './Pages/Consultation';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: ${props => props.theme.fonts.body};
    background: #f9fafb;
    color: ${({ theme }) => theme.colors.text};
    max-width: 100vw;
    min-height: 100vh;
  }
  h1,h2,h3 { font-family: ${props => props.theme.fonts.heading};
`;

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  
  
  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch]);

   if (user) {
    console.log('Пользователь найден')
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
      <NavBar />
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<LawyerProfile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/consult" element={<ConsultationForm />} />
          {user ? <Route path="/profile" element={<Profile />} /> : <Route path="/login" element={<Login />} />}
          {/* <Route path="/news" element={<AboutUs />} />
          <Route path="/news/:id" element={<Team />} />
          <Route path="/news/:id" element={<Projects />} />
          <Route path="/news/:id" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
