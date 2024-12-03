"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? <Loader className="w-4 h-4 animate-spin" /> : "Create Project"}
    </Button>
  );
};

export default SubmitButton;
