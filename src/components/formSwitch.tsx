"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SwitchDialog } from "./switchDialog";
import { CardSetNumberOfQueries } from "./cardNumberOfQueries";
import { toast } from "./ui/use-toast";

export function SwitchForm() {
  const [isKendraTurnOff, setKendraTurnOff] = useState(false);
  const [isOverrideKendra, setOverrideKendra] = useState(false);

  const [maxQuery, setMaxQuery] = useState(100); // Initialize with 1000 as the default value

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://m6kn45igy3.execute-api.ap-southeast-1.amazonaws.com/stg/kendra/threshold"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the data.");
      }
      const result = await response.json();
      const data = result.data;
      setOverrideKendra(data.manualOverride.overrideKendraControl);
      setKendraTurnOff(data.manualOverride.turnOffKendra);
      // setMaxQuery(data.maxQuery);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  const fetchDataTurnOffKendra = async () => {
    try {
      const response = await fetch(
        "https://m6kn45igy3.execute-api.ap-southeast-1.amazonaws.com/stg/kendra/threshold"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the data.");
      }
      const result = await response.json();
      const data = result.data;
      setKendraTurnOff(data.manualOverride.turnOffKendra);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSwitchChange = async (checked: boolean) => {
    setOverrideKendra(checked);
    if (!checked) {
      setKendraTurnOff(false);
    }
    await fetchDataTurnOffKendra();
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch(
        "https://m6kn45igy3.execute-api.ap-southeast-1.amazonaws.com/stg/kendra/threshold",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            manualOverride: {
              overrideKendraControl: isOverrideKendra,
              turnOffKendra: isKendraTurnOff,
            },
            maxQuery,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to make the request.");
      }

      console.log("Request successfully sent!");
      toast({
        title: "Save successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  const handleSaveQuery = (query: number) => {
    setMaxQuery(query);
    console.log("Max query set to:", query);
  };

  const handleCancel = () => {
    console.log("Action canceled");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl mr-4">
              Override Kendra Control
            </h1>
            <Switch
              checked={isOverrideKendra}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Turn Off Kendra</p>
            <p className="text-sm text-muted-foreground">
              {
                "Kendra's features are replaced with standard legacy search when turned off."
              }
            </p>
          </div>
          <SwitchDialog
            isDisabledOverride={!isOverrideKendra}
            isKendraTurnOff={isKendraTurnOff}
            setKendraTurnOff={setKendraTurnOff}
          />
        </div>
      </CardContent>

      <CardSetNumberOfQueries
        onChange={setMaxQuery}
        disabled={!isOverrideKendra}
      />

      <CardFooter className="flex justify-end py-5">
        <Button onClick={handlePostRequest}>Save</Button>
      </CardFooter>
    </Card>
  );
}
