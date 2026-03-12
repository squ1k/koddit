import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

import "./LoginForm.css"

export default function LoginForm() {
  return (

    <form className="login-form">

      <div className="mb-3">
        <Input placeholder="Телефон" />
      </div>

      <div className="mb-3">
        <Input
          type="password"
          placeholder="Пароль"
        />
      </div>

      <Button>
        Войти
      </Button>

    </form>

  )
}