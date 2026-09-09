// import "dotenv/config";
// import { PrismaClient } from "@/app/generated/prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";

// const adapter = new PrismaNeon({
//   connectionString: process.env.DATABASE_URL!,
// });

// export const prisma = new PrismaClient({ adapter });

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../generated/prisma8/contract.js";
import contractJson from "../generated/prisma8/contract.json" with { type: "json" };

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = postgres<Contract>({ url: connectionString, contractJson });

export default prisma;
