-- Add pricing and booking fields to hotels table
ALTER TABLE hotels ADD COLUMN min_price numeric(10,2);
ALTER TABLE hotels ADD COLUMN taxes_included boolean DEFAULT false;
ALTER TABLE hotels ADD COLUMN meal_type text;
ALTER TABLE hotels ADD COLUMN free_cancellation_before timestamp;
