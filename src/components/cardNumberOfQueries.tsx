import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CardSetNumberOfQueriesProps {
  onChange: (value: any) => void;
  disabled: boolean;
}

export function CardSetNumberOfQueries({
  onChange,
  disabled,
}: CardSetNumberOfQueriesProps) {
  return (
    <div className="px-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Set the maximum number of queries per day</CardTitle>
          <CardDescription>
            Input the maximum daily query limit for Kendra.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="grid gap-3">
                <Input
                  disabled={disabled}
                  id="queries"
                  type="number"
                  placeholder="1000"
                  onChange={(e) => onChange(Number(e.target.value))}
                />
              </div>
            </div>
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button onClick={handleSave}>Save</Button>
          </CardFooter> */}
      </Card>
    </div>
  );
}
