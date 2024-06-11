"use client";
import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "./ui/card";
import DatePickerPopover from "./ui/datePickerPopOver";
import { format, parse } from "date-fns";
import DashboardCards from "./cardNoOfQueries";
import { toast } from "./ui/use-toast";

export function MainSection() {
  const [date, setDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy/MM/dd")
  );
  const [kendraStatus, setKendraStatus] = useState<boolean>(true); // Initial status set to true
  const [maxQuery, setMaxQuery] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const KENDRA_API = `${process.env.NEXT_PUBLIC_KENDRA_API}/threshold` || "";

  console.log(KENDRA_API);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(KENDRA_API);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setKendraStatus(data.data.manualOverride.turnOffKendra);
        setMaxQuery(data.data.maxQuery);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [KENDRA_API]);

  const handleCancel = () => {
    setDate(undefined);
    setIsOpen(false);
  };

  const handleDone = () => {
    if (date) {
      setSelectedDate(format(date, "yyyy/MM/dd"));
    } else {
      setSelectedDate(format(new Date(), "yyyy/MM/dd"));
    }
    setDate(undefined);
    setIsOpen(false);
  };

  const handleSave = (maxQueries: number) => {
    console.log("Saving max queries:", maxQueries);

    fetch(KENDRA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maxQuery: maxQueries,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Save successfully",
          variant: "default",
        });
        console.log("Data saved successfully:", data);
        setMaxQuery(maxQueries);
        setIsDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        toast({
          title: "Error saving data",
          variant: "destructive",
        });
      });
  };

  const selectedDateObj = parse(selectedDate, "yyyy/MM/dd", new Date());

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Kendra Dashboard</h1>
      </div>
      <div className="ml-6 flex items-center gap-2">
        <Card className="flex items-center space-x-4 rounded-md border p-3">
          <CardTitle className="text-sm font-medium leading-none">
            Kendra Status: {kendraStatus ? "Off" : "On"}
          </CardTitle>
        </Card>
        <DatePickerPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          date={date}
          selectedDateObj={selectedDateObj}
          setDate={setDate}
          selectedDate={selectedDate}
          handleCancel={handleCancel}
          handleDone={handleDone}
        />
      </div>
      <DashboardCards
        date={selectedDate || format(new Date(), "yyyy/MM/dd")}
        maxQueryPerDay={maxQuery}
        handleSave={handleSave}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </main>
  );
}

export default MainSection;
