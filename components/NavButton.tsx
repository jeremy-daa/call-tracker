"use client";
import { Button as Button2 } from "@/components/ui/button";

import { signOut } from "next-auth/react";
import React from "react";

const NavButton = () => {
  return (
    <div className="flex">
      <Button2
        className="bg-slate-200 text-slate-900 hover:bg-slate-200 rounded-[5px]"
        onClick={() => signOut()}
      >
        Logout
      </Button2>
    </div>
  );
};

export default NavButton;
