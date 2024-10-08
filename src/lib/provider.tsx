"use client";
import React, { ReactNode } from "react";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
