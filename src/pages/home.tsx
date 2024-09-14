
import { Suspense } from "react"

export function Home() {

  return (
    <div className="y-10 px-4">
      <Suspense fallback={<p>Carregando...</p>}>
        <div>Oi</div>
      </Suspense>
    </div>
  )
}