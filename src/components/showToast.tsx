"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Define the props interface
interface ToastSimpleProps {
  description: string;
  title?: string;
}

// Modify the component to accept props
export function ToastSimple({ description, title }: ToastSimpleProps) {
  const { toast } = useToast();

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        toast({
          title,
          description,
        });
      }}
    >
      Show Toast
    </Button>
  );
}
