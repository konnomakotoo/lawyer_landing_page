import { useNavigate } from 'react-router-dom'
import { Button } from '../ui-kit/Button'
import { fetchLogoutUser } from '../redux/slices/userSlice';
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../redux/store/redux.store';

export default function NavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
         dispatch(fetchLogoutUser());
         navigate("/");
      };
      
  return (
    <div>
        <div>Hello</div>
        <Button $variant="secondary" onClick={() => alert('Записались!')}>Click me!</Button>
        <Button $variant="secondary" onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button $variant="secondary" onClick={() => navigate('/login')}>Login</Button>
        <Button $variant="secondary" onClick={handleLogout}>Log Out</Button>
    </div>
  )
}

