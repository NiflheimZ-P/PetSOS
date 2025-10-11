import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-2xl font-bold tracking-tighter">Pet SOS</h1>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/lost"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Lost
            </Link>
            <Link
              href="/strays"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Strays
            </Link>
            <Link
              href="/post"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              create your post
            </Link>

          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {/* ปุ่มแจ้งเตือน */}
            <Link href="/profile/notification">
              <Button
                variant="ghost"
                className="relative p-2 hover:bg-primary/10 rounded-full"
              >
                <Bell className="w-6 h-6 text-primary" />
                {/* จุดแดงสำหรับจำนวนแจ้งเตือน */}
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Button>
            </Link>
          </div>

          <DropdownMenu>
            {/* trigger */}
            <DropdownMenuTrigger>
              <Link href="/profile">
                <Avatar className="cursor-pointer hover:opacity-80 transition">
                  <AvatarImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1dh9E62x3If0tvhUQrRuXRHVhGTpMUMgNGQgSrFIo_lJB2opmFL1nhE8ajHpvC2InQ0GdUbr8US8IOEUvmSeSe1QK3AFNn99NSY6zEqVipXIjS9WjbBPug5eWDJITSNZihol7Hp_oNDO0PRwMdV3yNC60S7yeiaiEJMEDmb040R1TumntnIgs8m9fJlo6dtqC_39koUAzY94ZfydJWv46zZiUasDFR0ZLOOBrvsFq8D1LrCBr759isyX8HvOd98EfUUm86pDmQltT"
                    alt="User avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            </DropdownMenuTrigger>
            {/* dropdown list */}
            <DropdownMenuContent>
              <DropdownMenuLabel>User Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile/notification">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
export default Navbar
