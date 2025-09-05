export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'retailer' | 'consumer';
  avatar?: string;
  location?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  farmerId: string;
  farmerName: string;
  harvestDate: string;
  quantity: number;
  quality: 'A+' | 'A' | 'B' | 'C';
  price: number;
  location: string;
  certifications: string[];
  qrCode: string;
  status: 'harvested' | 'in-transit' | 'delivered' | 'sold';
  blockchainHash: string;
}

export interface Transaction {
  id: string;
  productId: string;
  from: string;
  to: string;
  timestamp: string;
  type: 'harvest' | 'transfer' | 'delivery' | 'sale';
  hash: string;
  verified: boolean;
  amount?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export interface AnalyticsData {
  totalProducts: number;
  totalTransactions: number;
  totalFarmers: number;
  totalRetailers: number;
  monthlyRevenue: number;
  qualityDistribution: Record<string, number>;
  popularCrops: Array<{ name: string; count: number }>;
}