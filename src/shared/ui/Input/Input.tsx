import './Input.css'

type Props = {
  placeholder?: string
  type?: string
}

export default function Input({ placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="form-control"
    />
  )
}