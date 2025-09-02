"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Follow() {
  const [follow, setFollow] = useState(false);
  return (
    <Button
      onClick={() => setFollow(!follow)}
      className="hover:cursor-pointer"
      variant={"secondary"}
    >
      {follow ? (
        <span className="flex items-center gap-2">
          <IoMdCheckmarkCircleOutline /> Followed
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <FiPlusCircle /> Follow
        </span>
      )}
    </Button>
  );
}
