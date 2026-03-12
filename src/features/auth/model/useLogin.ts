import { useState } from "react"

export function useLogin() {

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()

    console.log(phone, password)
  }

  return {
    phone,
    password,
    setPhone,
    setPassword,
    submit
  }
}