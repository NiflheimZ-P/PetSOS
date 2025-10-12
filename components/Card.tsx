import Image from "next/image"
interface CardProps {
  title: string
  location?: string
  timeAgo: string
  imageUrl: string
}

export function Card({ title, location, timeAgo, imageUrl }: CardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">Updated {timeAgo}</p>
      </div>
    </div>
  )
}

