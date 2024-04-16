"use client";
import FileManager from "@/app/dashboard/file-manager/page";
import { useParams } from "next/navigation";
import React from "react";

export default function WebsiteFTP() {
  const { id } = useParams();

  return <FileManager website={id} />;
}
