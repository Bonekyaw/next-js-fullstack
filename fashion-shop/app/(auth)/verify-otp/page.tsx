import VerifyOtpForm from "@/components/auth/verify-otp-form";
import type { Metadata } from "next";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Enter the one-time code sent to your email.",
  ...noIndexMetadata,
};

export default function verifyOtp() {
  return <VerifyOtpForm />;
}
