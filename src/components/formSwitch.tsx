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
import { toast } from "./ui/use-toast";

interface ManualOverride {
  overrideKendraControl: boolean;
  turnOffKendra: boolean;
}

export function SwitchForm() {
  const [isKendraTurnOff, setKendraTurnOff] = useState(false);
  const [isOverrideKendra, setOverrideKendra] = useState(false);
  const [initialData, setInitialData] = useState<ManualOverride>({
    overrideKendraControl: isOverrideKendra,
    turnOffKendra: isKendraTurnOff,
  });
  const [isModified, setIsModified] = useState(false);
  const NEXT_PUBLIC_KENDRA_API =
    `${process.env.NEXT_PUBLIC_KENDRA_API}/threshold` || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(NEXT_PUBLIC_KENDRA_API);
        if (!response.ok) {
          throw new Error("Failed to fetch the data.");
        }
        const result = await response.json();
        const data = result.data;
        setInitialData(data.thresholdConfig.manualOverride);
        setOverrideKendra(
          data.thresholdConfig.manualOverride.overrideKendraControl
        );
        setKendraTurnOff(data.thresholdConfig.manualOverride.turnOffKendra);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchData();
  }, [NEXT_PUBLIC_KENDRA_API]);

  useEffect(() => {
    setIsModified(
      initialData.overrideKendraControl !== isOverrideKendra ||
        initialData.turnOffKendra !== isKendraTurnOff
    );
  }, [isOverrideKendra, isKendraTurnOff, initialData]);

  const handleSwitchChange = async (checked: boolean) => {
    setOverrideKendra(checked);
  };
  const handlePostRequest = async () => {
    if (!isModified) {
      toast({
        title: "No changes detected.",
        variant: "default",
      });
      console.log("No changes detected. No request made.");
      return;
    }

    try {
      const response = await fetch(NEXT_PUBLIC_KENDRA_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          manualOverride: {
            overrideKendraControl: isOverrideKendra,
            turnOffKendra: isKendraTurnOff,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to make the request.");
      }
      setInitialData({
        overrideKendraControl: isOverrideKendra,
        turnOffKendra: isKendraTurnOff,
      });

      console.log("Request successfully sent!");
      toast({
        title: "Save successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error making the request:", error);
      toast({
        title: "Error making the request",
        variant: "destructive",
      });
    }
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

      <CardFooter className="flex justify-end">
        <Button onClick={handlePostRequest}>Save</Button>
      </CardFooter>
    </Card>
  );
}
