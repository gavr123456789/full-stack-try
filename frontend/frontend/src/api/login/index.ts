import axios from "axios";
import { LoginDto } from "./dto";

// returns secret key
export async function login(loginDto: LoginDto) {
  const result = await axios.post("/login", loginDto)
  if (result.status === 200){
    return result.data as string
  } else {
    console.error("login return status: ", result.status)
    return null
  }
}