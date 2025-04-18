import Header from "./components/base/Header"
import SideBar from "./components/base/SideBar"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-400">
      <div className="flex">
      <SideBar/>
      </div>
      <div className="ml-20 md:ml-56 rounded-lg mr-4 m-4">
      <Header/>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout
