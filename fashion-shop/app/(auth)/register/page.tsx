import { Suspense } from "react";
import { redirect } from "next/navigation";

import SignUpForm from "@/components/auth/signup-form";
import { getSession } from "@/lib/session";

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
