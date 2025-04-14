"use client";

import IsAdmin from "@/components/IsAdmin/IsAdmin";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IsAdmin>{children}</IsAdmin>;
}
