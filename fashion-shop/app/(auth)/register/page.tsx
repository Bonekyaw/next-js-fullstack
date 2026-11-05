import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import SignUpForm from "@/components/auth/signup-form";
import { getSession } from "@/lib/session";

import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Fashion Shop account to start shopping.",
  ...noIndexMetadata,
};

async function RegisterPageContent() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
}

export default function Register() {
  return (
    <Suspense fallback={<SignUpForm />}>
      <RegisterPageContent />
    </Suspense>
  );
}
