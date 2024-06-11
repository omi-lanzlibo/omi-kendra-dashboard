import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

interface SetNumberOfQueriesProps {
  onSave: (maxQueries: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SetNumberOfQueries({
  onSave,
  isOpen,
  setIsOpen,
}: SetNumberOfQueriesProps) {
  const [maxQueries, setMaxQueries] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMaxQueries(value);
    }
  };

  const handleSaveClick = () => {
    const maxQueriesNumber = parseInt(maxQueries, 10);
    if (!isNaN(maxQueriesNumber)) {
      onSave(maxQueriesNumber);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setMaxQueries("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Max Queries</DialogTitle>
          <DialogDescription>
            Enter the maximum number of queries per day.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={maxQueries}
          onChange={handleInputChange}
          type="text"
          placeholder="0"
        />
        <DialogFooter>
          <Button onClick={handleSaveClick} disabled={!maxQueries}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
