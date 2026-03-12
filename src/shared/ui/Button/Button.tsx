import './Button.css'

type Props = {
  children: React.ReactNode
}

export default function Button({ children }: Props) {
  return (
    <button className="btn btn-primary text-center">
      {children}
    </button>
  )
}