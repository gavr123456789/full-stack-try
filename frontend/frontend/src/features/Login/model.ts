import { createEffect, createStore } from "effector";
import { login } from "../../api/login";
import { LoginDto } from "../../api/login/dto";
import { globalNavigate } from "../../pages/Login";
import { LoginStoreState } from "./types";



export const loginFx = createEffect(async (loginDto: LoginDto) => {
  return await login(loginDto)
})


export const $loginStore = createStore<LoginStoreState>({isLogIn: false, secretKey: null})
  .on(loginFx.doneData, (loginInit, responseSecretKey) => {
    if (responseSecretKey) {
      console.log(responseSecretKey);
      
      globalNavigate("/home/count")
      return {
        isLogIn: true,
        secretKey: responseSecretKey
      }
    } else {
      console.log("BAD!");
      return {
        isLogIn: false,
        secretKey: null
      }
    }
  })


