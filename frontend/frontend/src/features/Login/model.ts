import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";
import { useNavigate } from "react-router";
import { globalNavigate } from "../../pages/Login";
import { LoginDto, LoginStoreInit } from "./types";



export const login = createEffect(async (loginDto: LoginDto) => {
  const sas: {data: string} = await axios.post("/login", loginDto)
  return sas.data
})


export const $loginStore = createStore<LoginStoreInit>({isLogIn: false})
  .on(login.doneData, (loginInit, response) => {
    if (response) {
      console.log(response);
      globalNavigate("/home")
    } else {
      console.log("BAD!");
    }
  })


