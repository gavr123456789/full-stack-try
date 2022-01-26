import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Login } from "../features/Login/Login";


export let globalNavigate: NavigateFunction


export const LoginPage: FC = () => {
  let navigate = useNavigate();
  globalNavigate = navigate
  return (
  
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "100vh"}}>
    <Login />
  </div>
  
  )
}
