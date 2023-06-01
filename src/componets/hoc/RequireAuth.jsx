import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hook_redux';
import { useState, useEffect } from "react";
import { setShowNavBar } from '../../store/mobileSlice'


const RequireAuth = ({children}) => {
    const loccation = useLocation();
    const token = localStorage.getItem('manage_jwt')
    const dispatch = useAppDispatch() 
    const mobileMode = useAppSelector(state => state.mobileMode)

    // если мобильный режим => скрывает при каждом переходе меню
    useEffect(() => {
        if (mobileMode.mobileMode && mobileMode.showNavBar){
            dispatch(setShowNavBar(false))
        }
    }, [loccation]);

    if (!token || token == ''){
        return <Navigate to='/login' state={{from: loccation}} />
    }
    

    return children;
}

export default RequireAuth;