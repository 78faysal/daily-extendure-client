import { Navigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {loading, user} = useAuth();

    if(loading){
        return <Spinner />
    }
    // console.log(loading);

    if( user){
        return children;
    }

    return <Navigate to={'/login'}/>;
};

export default PrivateRoute;