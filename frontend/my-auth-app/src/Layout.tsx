import Header from "./components/base/Header"
import SideBar from "./components/base/SideBar"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-slate-50">
      <div className="flex">
      <SideBar/>
      </div>
      <div className="shadow-2xl ml-20 md:ml-56 bg-white rounded-lg mr-4 m-4">
      <Header/>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout
