import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Image
        src="/hero-wishlist.jpg"
        alt="Wishlist Hero"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Your Personal Wishlist</h1>
        <p className="text-xl">Sign in to start collecting your wishes</p>
      </div>
    </div>
  )
}