import React from "react";
import Footer from "../../Footer/Footer"
import HeaderEditor from "../../HeaderEditor/HeaderEditor"

type Props = {
  children: JSX.Element
}

const EditorLayout = ({ children }: Props) => (
  <>
  <div>
    <HeaderEditor></HeaderEditor>
    <main>{ children }</main>
    <Footer></Footer>
  </div>
  </>
)

export default EditorLayout