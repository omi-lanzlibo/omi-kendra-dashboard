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
import { Skeleton } from "./ui/skeleton";

interface Props {
  date: string; // Date prop
  maxQueryPerDay: number;
}

interface ResponseItem {
  pk: { S: string };
  sk: { S: string };
  count: { N: string };
}

export default function CardNoOfQueries({ date, maxQueryPerDay }: Props) {
  const [responseItems, setResponseItems] = useState<ResponseItem[]>([]);
  const [displayDate, setDisplayDate] = useState<string>(""); // State to hold the date

  const callAPI = async (date: string) => {
    try {
      const res = await fetch(
        `https://m6kn45igy3.execute-api.ap-southeast-1.amazonaws.com/stg/kendra/search-count/${date}`
      );
      const data = await res.json();

      if (data && data.data && data.data.Items && data.data.date) {
        const items = data.data.Items.map((item: any) => ({
          pk: item.pk,
          sk: item.sk,
          count: item.count,
          date: data.data.date, // Assign the extracted date to each item
        }));
        setResponseItems(items as ResponseItem[]); // Set the items array in state
        const formattedDate = format(parseISO(data.data.date), "PPP");
        setDisplayDate(formattedDate); // Set the displayDate state
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI(date); // Make API call with the provided date
  }, [date]); // Call useEffect whenever the date prop changes

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>{displayDate}</CardDescription>{" "}
            {/* Display the date */}
            <CardTitle className="text-4xl">
              {responseItems.length > 0 ? responseItems[0].count.N : 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">No. of queries</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Per day</CardDescription>
            <CardTitle className="text-4xl">{maxQueryPerDay}</CardTitle>{" "}
            {/* Assuming this is a static value */}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Max Number of queries
            </div>
          </CardContent>
        </Card>
        {/* <CardWithForm></CardWithForm> */}
      </main>
    </div>
  );
}
