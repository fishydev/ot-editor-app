import React, { useState } from 'react'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import Home from "src/components/Home/Home"
import LoginCard from "src/components/LoginCard/LoginCard"
import SignUpCard from "src/components/SignUpCard/SignUpCard"

const HomeLayout = () => {
  const [loginCard, setLoginCard] = useState(false)
  const [signUpCard, setSignUpCard] = useState(false)

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

  return (
    <>
      <div>
        <Header handleShowLogin={handleShowLogin}></Header>
        <Home></Home>
        <LoginCard isOpen={loginCard} onSignUp={handleShowSignUp} onClose={handleClose} />
        <SignUpCard isOpen={signUpCard} onLogin={handleShowLogin} onClose={handleClose} />
        <Footer></Footer>
      </div>
    </>
  )
}

export default HomeLayout
