import React from "react"
import HomeLayout from "../components/Layout/Home/HomeLayout"
import Home from "../components/Home/Home"

const HomeRoute = () => {
  return (
    <>
      <HomeLayout>
        <Home />
      </HomeLayout>
    </>
  );
}

export default HomeRoute