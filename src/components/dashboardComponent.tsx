"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardTitle } from "./ui/card";
import CardNoOfQueries from "./cardNoOfQueries";
import DatePickerPopover from "./ui/datePickerPopOver";
import { format, parse } from "date-fns";

export function MainSection() {
  const [date, setDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy/MM/dd")
  );
  const [kendraStatus, setKendraStatus] = useState<boolean>(true); // Initial status set to true
  const [maxQuery, setMaxQuery] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m6kn45igy3.execute-api.ap-southeast-1.amazonaws.com/stg/kendra/threshold"
        );
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
  }, []);

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
      <CardNoOfQueries
        date={selectedDate || format(new Date(), "yyyy/MM/dd")}
        maxQueryPerDay={maxQuery}
      />
    </main>
  );
}

export default MainSection;
