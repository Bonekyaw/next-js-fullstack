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

export async function applyPendingRegistration(
  email: string,
): Promise<boolean> {
  const pendingRegistration = await db.orm.public.PendingRegistration.where({
    email,
  }).first();

  if (
    !pendingRegistration ||
    Temporal.PlainDateTime.compare(
      pendingRegistration.expiresAt,
      Temporal.Now.plainDateTimeISO(),
    ) < 0
  ) {
    if (pendingRegistration) {
      await db.orm.public.PendingRegistration.where({ email }).delete();
    }

    return false;
  }

  const user = await db.orm.public.User.select("id").where({ email }).first();

  if (!user) {
    if (pendingRegistration) {
      await db.orm.public.PendingRegistration.where({ email }).delete();
    }
    return false;
  }

  // 1. Update the user's name and Account's password hash with the pending registration data
  // 2. Delete the pending registration entry

  await db.transaction(async (trx) => {
    await trx.orm.public.User.where({ id: user.id }).update({
      name: pendingRegistration.name,
    });

    await trx.orm.public.Account.where({ userId: user.id }).update({
      password: pendingRegistration.passwordHash,
    });

    await trx.orm.public.PendingRegistration.where({ email }).delete();
  });

  return true;
}
