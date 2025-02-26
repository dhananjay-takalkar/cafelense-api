export interface ICafe {
  cafe_id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  mobile_number: string;
  logo_url: string;
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
