CREATE TYPE "public"."booking_status" AS ENUM('INIT', 'PREBOOKED', 'PENDING_PAYMENT', 'PROCESSING', 'CONFIRMED', 'FAILED', 'CANCELLED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."hotel_status" AS ENUM('ACTIVE', 'TEMPORARILY_UNAVAILABLE', 'STALE', 'REMOVED', 'REDIRECTED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('NEW', 'PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUND_PENDING', 'REFUNDED');--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"action" text NOT NULL,
	"old_data" jsonb,
	"new_data" jsonb,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"partner_order_id" text NOT NULL,
	"ostrovok_order_id" text,
	"hotel_hid" integer NOT NULL,
	"hotel_name" text NOT NULL,
	"checkin_date" timestamp NOT NULL,
	"checkout_date" timestamp NOT NULL,
	"nights_count" integer NOT NULL,
	"guests_count" integer NOT NULL,
	"rooms_count" integer NOT NULL,
	"rooms_data" jsonb,
	"total_price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'RUB' NOT NULL,
	"status" "booking_status" DEFAULT 'INIT' NOT NULL,
	"payment_type" text DEFAULT 'now' NOT NULL,
	"ostrovok_book_hash" text,
	"ostrovok_search_hash" text,
	"ostrovok_prebook_hash" text,
	"free_cancellation_before" timestamp,
	"cancellation_policies" jsonb,
	"customer_email" text NOT NULL,
	"customer_phone" text,
	"customer_residency" text DEFAULT 'RU',
	"pay_uuid" text,
	"init_uuid" text,
	"return_path" text,
	"three_ds_url" text,
	"three_ds_status" text,
	"error_message" text,
	"confirmed_at" timestamp,
	"cancelled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_partner_order_id_unique" UNIQUE("partner_order_id"),
	CONSTRAINT "bookings_ostrovok_order_id_unique" UNIQUE("ostrovok_order_id")
);
--> statement-breakpoint
CREATE TABLE "hotel_redirects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"old_slug" text NOT NULL,
	"new_slug" text,
	"status_code" integer DEFAULT 301 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hotel_redirects_old_slug_unique" UNIQUE("old_slug")
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ostrovok_hid" integer NOT NULL,
	"ostrovok_id" text,
	"name" text NOT NULL,
	"normalized_name" text NOT NULL,
	"slug" text NOT NULL,
	"country" text,
	"region" text,
	"city" text,
	"district" text,
	"address" text,
	"geo" geometry(point),
	"stars" integer,
	"property_type" text,
	"description" text,
	"amenities" jsonb,
	"contacts" jsonb,
	"images" jsonb,
	"status" "hotel_status" DEFAULT 'ACTIVE' NOT NULL,
	"source" text DEFAULT 'ostrovok',
	"last_synced_at" timestamp NOT NULL,
	"last_seen_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hotels_ostrovok_hid_unique" UNIQUE("ostrovok_hid"),
	CONSTRAINT "hotels_ostrovok_id_unique" UNIQUE("ostrovok_id"),
	CONSTRAINT "hotels_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"hotel_hid" integer NOT NULL,
	"user_id" uuid,
	"author_name" text NOT NULL,
	"rating" integer NOT NULL,
	"cleanliness_rating" integer,
	"location_rating" integer,
	"staff_rating" integer,
	"comfort_rating" integer,
	"value_rating" integer,
	"facilities_rating" integer,
	"wifi_rating" integer,
	"title" text,
	"content" text NOT NULL,
	"photos" jsonb DEFAULT '[]'::jsonb,
	"verified" boolean DEFAULT false NOT NULL,
	"source" text DEFAULT 'veles',
	"status" text DEFAULT 'PENDING' NOT NULL,
	"moderation_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"residency" text DEFAULT 'RU',
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;