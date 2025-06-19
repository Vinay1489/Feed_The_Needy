import { useContext, useReducer } from "react";
import { createContext } from "react";



const AuthContext = createContext();

const initialState = {
    user:null,
    isAuthenticated:false,
}


function reducer(state,action){
    switch(action.type){
        case "login":
            return{
                ...state,user:action.payload,isAuthenticated:true
            }
        case "logout":
            return {
                ...state,isAuthenticated:false
            }

        default:
            throw new Error("unknown action");
    }
}


const FAKE_USER = {
    email: "harsha@gmail.com",
    password: "harsha",
};

function AuthProvider({children}){
    const [{user,isAuthenticated},dispatch] = useReducer(reducer,initialState);

    function logout(){
        dispatch({type:"logout"});
    }


function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  return (
    <AuthContext.Provider value={{isAuthenticated,user,login,logout}}>
        {children}

    </AuthContext.Provider>
  )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider,useAuth};