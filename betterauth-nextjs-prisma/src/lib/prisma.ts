import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import postgres from "@prisma/orm-postgres/runtime"; 
import { contractFromJson } from "@prisma/orm-postgres/static"; 
import type { Contract } from "../generated/prisma8/contract.d"; 
import contractJson from "../generated/prisma8/contract.json" with { type: "json" }; 

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter }); // Prisma 7

export const contract = contractFromJson<Contract>(contractJson); 

export const db = postgres({ url: connectionString, contract });  // Prisma 8

