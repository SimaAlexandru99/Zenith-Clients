import Link from "next/link"
import { Button } from "components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Customer Not Found</h2>
      <p className="mb-4">Could not find requested customer</p>
      <Link href="/customers" passHref>
        <Button>Return to Customers</Button>
      </Link>
    </div>
  )
}
