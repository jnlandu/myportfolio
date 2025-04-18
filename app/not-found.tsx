import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link href="/">
          <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Home className="mr-2 h-4 w-4" />
            Go back home
          </Button>
        </Link>
      </div>
    </main>
  )
}