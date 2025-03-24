import { type Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airtable Wishlist',
  description: 'Wishlist app built with Next.js and Airtable',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
