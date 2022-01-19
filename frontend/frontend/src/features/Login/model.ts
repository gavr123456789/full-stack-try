import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";
import { LoginDto, LoginStoreInit } from "./types";



export const login = createEffect(async (loginDto: LoginDto) => {
  const sas = await axios.post("/login", loginDto)
  // try ping
  // await axios.get("")
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


