import { FC } from "react";
import { Login } from "../features/Login/Login";

export const LoginPage: FC = () => {

  return (
  
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "100vh"}}>
    <Login />
  </div>
  
  )
}
