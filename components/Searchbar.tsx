import { Search } from "lucide-react"
import { Input } from "./ui/input"
const Searchbar = () => {
    return (
        <div>
            <div className="relative mb-12">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10"
                />
            </div>
        </div>
    )
}
export default Searchbar