"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SwitchDialogProps {
  isDisabledOverride: boolean;
  isKendraTurnOff: boolean;
  setKendraTurnOff: (value: boolean) => void;
}

export function SwitchDialog({
  isDisabledOverride,
  isKendraTurnOff,
  setKendraTurnOff,
}: SwitchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    if (!checked) {
      setKendraTurnOff(false); // Directly update state when toggling off
    } else {
      setIsOpen(true); // Show confirmation dialog when toggling on
    }
  };

  const handleConfirm = () => {
    setKendraTurnOff(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Switch
        disabled={isDisabledOverride}
        checked={isKendraTurnOff}
        onCheckedChange={handleSwitchChange}
      />

      <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {"Are you sure you want to turn off Kendra?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {"This action will deactivate Kendra's functionality."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
