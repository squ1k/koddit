import type { InputHTMLAttributes } from 'react'

import './Input.css'

type Props = InputHTMLAttributes<HTMLInputElement>


export default function Input(props: Props) {
  return (
    <input
      className="form-control"
      {...props}
    />
  )
}