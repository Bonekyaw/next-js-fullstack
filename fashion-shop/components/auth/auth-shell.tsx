import Link from "next/link";
import Image from "next/image";
import { SparklesIcon, TruckIcon, ShieldCheckIcon } from "lucide-react";

const highlights = [
  {
    icon: SparklesIcon,
    title: "Curated collections",
    description: "Fresh styles for every season and occasion.",
  },
  {
    icon: TruckIcon,
    title: "Fast delivery",
    description: "Track orders and get updates in real time.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure checkout",
    description: "Protected payments and verified sign-in.",
  },
] as const;

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(9,9,11,0.15),rgba(9,9,11,0.92))]" />
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/fashion-shop-auth/1200/1600"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 0px"
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-8 p-12 xl:p-16">
          <Link
            href="/login"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium tracking-[0.24em] text-white/80 uppercase transition-colors hover:text-white"
          >
            Fashion Shop
          </Link>

          <div className="max-w-md space-y-4">
            <p className="text-sm font-medium tracking-[0.28em] text-white/60 uppercase">
              Members only
            </p>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight text-white xl:text-5xl">
              Style that moves with you.
            </h1>
            <p className="text-base leading-relaxed text-white/72">
              Sign in to browse curated looks, save favorites, and checkout
              faster with a seamless shopping experience.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-4 p-12 xl:p-16">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-sm leading-relaxed text-white/65">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="bg-background flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4 lg:hidden">
          <Link
            href="/login"
            className="text-sm font-semibold tracking-[0.18em] uppercase"
          >
            Fashion Shop
          </Link>
          <span className="text-muted-foreground text-xs">Secure access</span>
        </header>

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
