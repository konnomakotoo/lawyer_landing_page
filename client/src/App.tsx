import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Slider from './components/Slider/Slider'
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './ui-kit/theme';
import NavBar from './components/NavBar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import type { AppDispatch, RootState } from './redux/store/redux.store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/slices/userSlice';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: sans-serif;
    background: #f9fafb;
    color: ${({ theme }) => theme.colors.text};
  }
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
          <Route path="/" element={<Slider />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
