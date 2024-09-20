"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";



const Providers = ({children}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;