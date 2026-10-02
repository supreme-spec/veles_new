ALTER TABLE "hotels" ADD COLUMN "seo_slug" text;--> statement-breakpoint
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_seo_slug_unique" UNIQUE("seo_slug");
