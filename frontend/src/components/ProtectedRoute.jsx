import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext"
import { useEffect } from "react";

function ProtectedRoute({children}) {
    //use protected route from jonas context api

    const {isAuthenticated}= useAuth();

    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated) navigate("/donorlogin");

    },[isAuthenticated,navigate])
    return (
        <div>
            {isAuthenticated ? children : "sorry u cant access"}
        </div>
    )
}

export default ProtectedRoute
