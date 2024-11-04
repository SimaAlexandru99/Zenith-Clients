import Link from "next/link"
import { Button } from "components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Clientul nu a fost găsit</h2>
      <p className="mb-4">Nu am găsit niciun client cu acest ID</p>
      <Link href="/clienti" passHref>
        <Button>Înapoi la lista de clienti</Button>
      </Link>
    </div>
  )
}
