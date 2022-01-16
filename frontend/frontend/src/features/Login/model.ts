import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";
import { LoginDto, LoginStoreInit } from "./types";



export const login = createEffect(async (loginDto: LoginDto) => {
  const sas = await axios.post("http://0.0.0.0:8080/user", loginDto)
  return sas.data
})


export const $loginStore = createStore<LoginStoreInit>({isLogIn: false})
  .on(login.doneData, (sas, qwe) => {
    if (qwe) {
      console.log("OK!");
    } else {
      console.log("BAD!");
    }
  })


