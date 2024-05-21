import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import NotFound from "../Pages/NotFound/NotFound";
import Sell from "../Pages/Sell/Sell";
import Purchase from "../Pages/Purchase/Purchase";
import Products from "../Pages/Products/Products";
import Profile from "../Pages/Profile/Profile";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Profile />
      },
      {
        path: 'sell',
        element: <Sell />
      },
      {
        path: 'purchase',
        element: <Purchase />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'profile',
        element: <Profile />
      },

    ]
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default router;
