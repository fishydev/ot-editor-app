import React from "react";
import Footer from "../../Footer/Footer"
import Header from "../../Header/Header"

type Props = {
  children: JSX.Element
}

const EditorLayout = ({ children }: Props) => (
  <>
  <div>
    <Header></Header>
    <main>{ children }</main>
    <Footer></Footer>
  </div>
  </>
)

export default EditorLayout