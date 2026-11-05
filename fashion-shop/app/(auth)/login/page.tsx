import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login-form";
import { getSession } from "@/lib/session";

import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Fashion Shop account.",
  ...noIndexMetadata,
};

async function LoginPageContent() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginForm />}>
      <LoginPageContent />
    </Suspense>
  );
}
