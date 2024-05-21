import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png.png';
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";



const MainLayout = () => {
  const navLinks = <>
    <li><Link to={'/profile'}><FaRegUser /> Profile</Link></li>
    <li><Link to={'/sell'}><MdOutlineSell/> Sell</Link></li>
    <li><Link to={'/purchase'}><BsCart2/> Purchase</Link></li>
    <li><Link to={'/products'}><IoBagHandleOutline/> Products</Link></li>
  </>
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-3">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn text-xl drawer-button lg:hidden"
          >
            <CgMenuLeftAlt/>
          </label>

          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-lg bg-base-200 text-base-content">
            {/* Sidebar content here */}
          <img className="w-32 mx-auto" src={logo} alt="" />
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
