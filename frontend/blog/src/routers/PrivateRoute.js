import React from 'react'
import {useLocation} from 'react-router'
import {Navigate, Outlet} from 'react-router-dom'
import getIsLogin from './getIsLogin'

export const publicPage = ['/', 'exam']

function PrivateRoutes() {
    const location = useLocation()
    const {pathname, search} = location
    const from = pathname + search
    const isLogined = getIsLogin()

    const passPage = publicPage.includes(pathname)

    return isLogined || passPage ? <Outlet /> : <Navigate to="/login" replace state={{from}} />
}

export default PrivateRoutes