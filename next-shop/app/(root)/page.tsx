import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="mt-4 bg-amber-600 p-4 text-2xl font-bold">
        Hello Next JS FullStack Developers
      </h1>
      <Link href="/login">Go to Login</Link>
      <Link href="/product">Go to Product</Link>
    </>
  );
}
