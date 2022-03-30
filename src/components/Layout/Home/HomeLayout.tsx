import React, { useState } from 'react'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import Home from 'src/components/Home/Home'
import LoginCard from 'src/components/LoginCard/LoginCard'
import SignUpCard from 'src/components/SignUpCard/SignUpCard'
import { useNavigate } from 'react-router-dom'

import { LoginResponse } from 'src/interfaces/auth'

type Props = {
  children: JSX.Element
}

const HomeLayout = ({ children }: Props) => {
  const [loginCard, setLoginCard] = useState(false)
  const [signUpCard, setSignUpCard] = useState(false)

  let navigate = useNavigate()

  const handleShowLogin = (show: boolean) => {
    setSignUpCard(!show)
    setLoginCard(show)
  }

  const handleShowSignUp = (show: boolean) => {
    setLoginCard(!show)
    setSignUpCard(show)
  }

  const handleClose = () => {
    setLoginCard(false)
    setSignUpCard(false)
  }

  const handleLogin = (payload: LoginResponse) => {
    localStorage.setItem('token', payload.token)
    handleClose()
    navigate('/files')
  }

  return (
    <>
      <div>
        <Header handleShowLogin={handleShowLogin}></Header>
        <main>{children}</main>
        <LoginCard
          isOpen={loginCard}
          onClickSignUp={handleShowSignUp}
          onClose={handleClose}
          onLogin={handleLogin}
        />
        <SignUpCard isOpen={signUpCard} onLogin={handleShowLogin} onClose={handleClose} />
        <Footer></Footer>
      </div>
    </>
  )
}

export default HomeLayout
