import { hashPassword } from "better-auth/crypto";
import { Temporal } from "temporal-polyfill";
import { db } from "../prisma";

export async function upsertPendingRegistration(
  email: string,
  name: string,
  password: string,
) {
  const passwordHash = await hashPassword(password);
  const expiresAt = Temporal.Now.plainDateTimeISO().add({ hours: 24 });

  await db.orm.public.PendingRegistration.upsert({
    create: { email, name, passwordHash, expiresAt },
    update: { name, passwordHash, expiresAt },
    conflictOn: { email },
  });
}
