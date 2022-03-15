import React from "react"
import Footer from "../../Footer/Footer"
import Header from "../../Header/Header"
import Home from "src/components/Home/Home"

type Props = {
  children: JSX.Element
}

const HomeLayout = () => (
  <>
    <div>
      <Header></Header>
      <main>
        <Home />
      </main>
      <Footer></Footer>
    </div>
  </>
)

export default HomeLayout
