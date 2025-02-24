import Link from "next/link";

export default function Photo() {
  return (
    <>
      <h1>photo/page</h1>
      <Link href="/photo/1" className="underline">
        Photo 1
      </Link>
    </>
  );
}