"use client";

import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const header = document.querySelector("body > header");
    const footer = document.querySelector("body > footer");
    const overlay = document.querySelector("body > header + div");
    if (header) (header as HTMLElement).style.display = "none";
    if (footer) (footer as HTMLElement).style.display = "none";
    if (overlay) (overlay as HTMLElement).style.display = "none";

    return () => {
      if (header) (header as HTMLElement).style.display = "";
      if (footer) (footer as HTMLElement).style.display = "";
      if (overlay) (overlay as HTMLElement).style.display = "";
    };
  }, []);

  return <>{children}</>;
}
