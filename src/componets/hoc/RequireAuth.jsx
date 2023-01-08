import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';



const RequireAuth = ({children}) => {
    const loccation = useLocation();
    const {user} = useAuth();

    if (!user){
        return <Navigate to='/login' state={{from: loccation}} />
    }

    return children;
}

export default RequireAuth;