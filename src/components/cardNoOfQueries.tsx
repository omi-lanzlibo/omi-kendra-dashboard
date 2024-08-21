"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "./ui/card";
import { format, parseISO } from "date-fns";
import { SetNumberOfQueries } from "./setNumberOfQueries";

interface Props {
  date: string; // Date prop
  maxQueryPerDay: number;
  handleSave: (maxQueries: number) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

interface ResponseItem {
  pk: { S: string };
  sk: { S: string };
  count: { N: string };
}

export default function DashboardCards({
  date,
  maxQueryPerDay,
  handleSave,
  isDialogOpen,
  setIsDialogOpen,
}: Props) {
  const [responseItems, setResponseItems] = useState<ResponseItem[]>([]);
  const [displayDate, setDisplayDate] = useState<string>("");
  const NEXT_PUBLIC_KENDRA_API =
    `${process.env.NEXT_PUBLIC_KENDRA_API}/search-count/${date}` || "";
  const callAPI = async (date: string) => {
    try {
      const res = await fetch(NEXT_PUBLIC_KENDRA_API);
      const data = await res.json();

      if (data && data.data && data.data.Items && data.data.date) {
        const items = data.data.Items.map((item: any) => ({
          pk: item.pk,
          sk: item.sk,
          count: item.count,
          date: data.data.date,
        }));
        setResponseItems(items as ResponseItem[]);
        const formattedDate = format(parseISO(data.data.date), "PPP");
        setDisplayDate(formattedDate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI(date);
  }, [date]);

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2 flex flex-col">
            <CardDescription className="py-2">{displayDate}</CardDescription>
            <CardTitle className="text-4xl">
              {responseItems.length > 0 ? responseItems[0].count.N : 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">No. of queries</div>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <CardDescription className="py-2">Per day</CardDescription>
              <SetNumberOfQueries
                onSave={handleSave}
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
              />
            </div>
            <CardTitle className="text-4xl">{maxQueryPerDay}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Max Number of queries
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
