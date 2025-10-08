export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageText: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
}

export interface NavItem {
  href: string;
  label: string;
}
