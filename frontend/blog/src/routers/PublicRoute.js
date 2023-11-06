import React, {useEffect} from 'react'
import {Navigate, useLocation, useNavigate} from 'react-router'
import {Outlet} from 'react-router-dom'
import getIsLogin from './getIsLogin'

function PublicRoute() {
    const location = useLocation()
    const navigate = useNavigate()
    const isLogined = getIsLogin()

    // eslint-disable-next-line no-undef
    return isLogined ? <Navigate to={from} replace /> : <Outlet />
}

export default PublicRoute