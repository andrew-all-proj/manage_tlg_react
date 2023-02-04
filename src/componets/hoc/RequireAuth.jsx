import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';



const RequireAuth = ({children}) => {
    const loccation = useLocation();
    //const {token} = useAuth();
    const token = localStorage.getItem('manage_jwt')

    if (!token || token == ''){
        return <Navigate to='/login' state={{from: loccation}} />
    }

    return children;
}

export default RequireAuth;