CREATE TABLE "weight_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"weight_kg" numeric(5, 2) NOT NULL,
	"recorded_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
