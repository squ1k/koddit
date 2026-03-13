import { useEffect } from "react"
import { setPageTitle } from "@/app/store/store"

import AppLayout from "@/app/layout/AppLayout"

export default function StudentProfilePage() {

  useEffect(() => {
    setPageTitle("Личный кабинет")
  }, [])

  return (

    <AppLayout title="Профиль ученика">

      <h1>
        Личный кабинет
      </h1>

    </AppLayout>

  )

}