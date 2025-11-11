/*
  # Initial Schema for Mobile Data Bundle App

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `phone_number` (text, unique)
      - `password_hash` (text)
      - `full_name` (text)
      - `created_at` (timestamptz)
    
    - `providers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `color` (text)
      - `icon` (text)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `bundle_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
    
    - `bundles`
      - `id` (uuid, primary key)
      - `provider_id` (uuid, foreign key)
      - `category_id` (uuid, foreign key)
      - `name` (text)
      - `data_amount` (text)
      - `duration` (text)
      - `price` (decimal)
      - `created_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `bundle_id` (uuid, foreign key)
      - `provider_id` (uuid, foreign key)
      - `amount` (decimal)
      - `payment_method` (text)
      - `phone_number` (text)
      - `status` (text)
      - `transaction_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for providers, categories, and bundles
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  icon text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view providers"
  ON providers FOR SELECT
  TO authenticated
  USING (true);

-- Bundle categories table
CREATE TABLE IF NOT EXISTS bundle_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  icon text NOT NULL
);

ALTER TABLE bundle_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON bundle_categories FOR SELECT
  TO authenticated
  USING (true);

-- Bundles table
CREATE TABLE IF NOT EXISTS bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) NOT NULL,
  category_id uuid REFERENCES bundle_categories(id) NOT NULL,
  name text NOT NULL,
  data_amount text NOT NULL,
  duration text NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view bundles"
  ON bundles FOR SELECT
  TO authenticated
  USING (true);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  bundle_id uuid REFERENCES bundles(id) NOT NULL,
  provider_id uuid REFERENCES providers(id) NOT NULL,
  amount decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  phone_number text NOT NULL,
  status text DEFAULT 'completed',
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert sample providers
INSERT INTO providers (name, color, icon, description) VALUES
  ('Hormud', '#4169E1', '📱', 'Fast and reliable'),
  ('Somtel', '#32CD32', '📡', 'Value bundles'),
  ('Golis', '#FF4500', '📶', 'Wide coverage'),
  ('Telesom', '#FFA500', '🌐', 'Best in class')
ON CONFLICT DO NOTHING;

-- Insert sample categories
INSERT INTO bundle_categories (name, description, icon) VALUES
  ('Daily Bundles', 'For 24-hour access', '📅'),
  ('Weekly Bundles', 'For 7-day access', '📆'),
  ('Monthly Bundles', 'For 30-day access', '🗓️'),
  ('Social Bundles', 'For social media', '📱'),
  ('Special Offers', 'Exclusive deals', '⭐'),
  ('Roaming', 'Stay connected', '✈️')
ON CONFLICT DO NOTHING;
