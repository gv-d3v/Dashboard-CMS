"use client";
import { useParams, useRouter } from "next/navigation";

export default function Website() {
  const { id } = useParams();
  const router = useRouter();

  return router.replace(`./${id}/manage`);
}
