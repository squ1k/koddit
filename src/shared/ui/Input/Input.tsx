import type { InputHTMLAttributes } from 'react'

import './Input.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export default function Input({ error, className = '', ...props }: Props) {
  const classes = `form-control${error ? ' is-invalid' : ''}${className ? ' ' + className : ''}`
  
  return (
    <input
      className={classes}
      {...props}
    />
  )
}