import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function DisplayCard() {
  return (
    <Card className="w-full max-w-md mt-8">
      <CardContent className="">
        <h2 className="text-2xl font-bold mb-2">Post Title</h2>
        <p className="text-muted-foreground">
          This is some sample content for the Reddit-style card. It can contain text, links, or any other
          information you want to display.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 pt-0">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">@username</p>
            <p className="text-sm text-muted-foreground">Posted 2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
            <ArrowBigUp className="h-6 w-6" />
          </Button>
          <span className="text-sm font-bold">42</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
            <ArrowBigDown className="h-6 w-6" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}