import {
  pgTable,
  serial,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const weightEntries = pgTable("weight_entries", {
  id: serial("id").primaryKey(),

  weightKg: numeric("weight_kg", {
    precision: 5,
    scale: 2,
  }).notNull(),

  recordedAt: timestamp("recorded_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});
