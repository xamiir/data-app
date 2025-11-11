export interface Provider {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface BundleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Bundle {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  data_amount: string;
  duration: string;
  price: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  bundle_id: string;
  provider_id: string;
  amount: number;
  payment_method: string;
  phone_number: string;
  status: string;
  transaction_date: string;
}

export interface User {
  id: string;
  phone_number: string;
  full_name: string;
}
