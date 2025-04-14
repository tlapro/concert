"use client";

import IsLogged from "@/components/IsLogged/IsLogged";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IsLogged>{children}</IsLogged>;
}
