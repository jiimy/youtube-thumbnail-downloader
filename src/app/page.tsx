import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

export default function Home() {
  return <Suspense fallback={<Loading />}></Suspense>
}
