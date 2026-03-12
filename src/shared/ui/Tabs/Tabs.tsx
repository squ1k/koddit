import { useEffect, useRef } from "react"
import "./Tabs.css"

type TabItem = {
  label: string
  value: string
}

type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
}

export default function Tabs({ items, value, onChange }: TabsProps) {

  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {

    const index = items.findIndex(i => i.value === value)
    const el = tabsRef.current[index]

    if (el && indicatorRef.current) {

      indicatorRef.current.style.width = `${el.offsetWidth}px`

      indicatorRef.current.style.transform =
        `translateX(${el.offsetLeft}px)`

    }

  }, [value, items])

  return (

    <div className="tabs">

      <div className="tabs-indicator" ref={indicatorRef} />

      {items.map((item, index) => (

        <button
          key={item.value}

          ref={(el) => {tabsRef.current[index] = el}}

          className={`tab ${value === item.value ? "active" : ""}`}

          onClick={() => onChange(item.value)}
        >

          {item.label}

        </button>

      ))}

    </div>

  )
}