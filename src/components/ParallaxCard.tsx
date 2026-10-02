'use client'

type Props = {
  imageUrl: string | undefined
  title: string
  subtitle: string
  temperature: string
}

export default function ParallaxCard({ imageUrl, title, subtitle, temperature }: Props) {
  const safeImageUrl = imageUrl ?? '/images/placeholder-country.jpg'

  return (
    <div className="w-full max-w-sm">
      <div
        className="relative h-[450px] w-full rounded-2xl bg-neutral-900 overflow-hidden"
      >
        {/* 1. Задний фон (Картинка) */}
        <div
          className="absolute inset-[-20px] bg-cover bg-center"
          style={{ backgroundImage: `url(${safeImageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* 2. Контент (Текст) */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-400 uppercase tracking-wider">
              {subtitle}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-md">
              {temperature}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white shadow-xl mb-2">
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}