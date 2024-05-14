import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Set number of queries </CardTitle>
        <CardDescription>Set the maximum number of queries per day</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="grid gap-3">
                    {/* <Label htmlFor="queries">No. of queries</Label> */}
                    <Input id="queries" type="number" placeholder="1,000" />
                  </div>
            <div className="flex flex-col space-y-1.5">
             
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
