import type { ReactNode } from "react"

import Header from "@/widgets/Header/ui/Header"
import Footer from "@/widgets/Footer/ui/"
import Container from "@/shared/ui/Container/"

type AppLayoutProps = {
  children: ReactNode,
}

export default function AppLayout({ children }: AppLayoutProps) {

  return (

    <Container>

      <Header />

      <main className="app-content container">
        {children}
      </main>

      <Footer />

    </Container>

  )
}