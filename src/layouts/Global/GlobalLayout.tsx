import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Home from 'src/components/Home/Home'
import LoginCard from 'src/components/LoginCard/LoginCard'
import LogoutCard from 'src/components/LogoutCard/LogoutCard'
import SignUpCard from 'src/components/SignUpCard/SignUpCard'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { removeToken, removeUser, setToken, setUser } from 'src/redux/auth/authSlice'

import { LoginResponse } from 'src/interfaces/auth'

type Props = {
  children: JSX.Element
}

const GlobalLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const [loginCard, setLoginCard] = useState(false)
  const [logoutCard, setLogoutCard] = useState(false)
  const [signUpCard, setSignUpCard] = useState(false)

  let navigate = useNavigate()

  const handleShowLogin = (show: boolean) => {
    handleClose()
    setLoginCard(show)
  }

  const handleShowLogout = (show: boolean) => {
    handleClose()
    setLogoutCard(show)
  }

  const handleShowSignUp = (show: boolean) => {
    handleClose()
    setSignUpCard(show)
  }

  const handleClose = () => {
    setLoginCard(false)
    setSignUpCard(false)
    setLogoutCard(false)
  }

  const handleLogin = (payload: LoginResponse) => {
    localStorage.setItem('token', payload.token)
    dispatch(setToken(payload.token))
    dispatch(
      setUser({
        userId: payload.userId,
        username: payload.username,
      })
    )
    handleClose()
    navigate('/files')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(removeToken())
    dispatch(removeUser())
    window.location.href = 'http://localhost:3000'
  }

  return (
    <>
      <div>
        <Header
          handleShowLogin={handleShowLogin}
          handleShowLogout={handleShowLogout}
        ></Header>
        <main>{children}</main>
        <LoginCard
          isOpen={loginCard}
          onClickSignUp={handleShowSignUp}
          onClose={handleClose}
          onLogin={handleLogin}
        />
        <LogoutCard isOpen={logoutCard} onClose={handleClose} onLogout={handleLogout} />
        <SignUpCard isOpen={signUpCard} onLogin={handleShowLogin} onClose={handleClose} />
        <Footer></Footer>
      </div>
    </>
  )
}

export default GlobalLayout
