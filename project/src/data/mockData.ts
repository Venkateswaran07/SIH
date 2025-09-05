import { Product, Transaction, User, Notification, AnalyticsData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@farmer.com',
    role: 'farmer',
    location: 'Punjab, India',
    phone: '+91 9876543210'
  },
  {
    id: '2',
    name: 'Green Valley Retail',
    email: 'contact@greenvalley.com',
    role: 'retailer',
    location: 'Delhi, India',
    phone: '+91 9876543211'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@consumer.com',
    role: 'consumer',
    location: 'Mumbai, India',
    phone: '+91 9876543212'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Organic Basmati Rice',
    type: 'Grains',
    farmerId: '1',
    farmerName: 'Rajesh Kumar',
    harvestDate: '2024-01-15',
    quantity: 500,
    quality: 'A+',
    price: 85,
    location: 'Punjab, India',
    certifications: ['Organic', 'Fair Trade', 'Non-GMO'],
    qrCode: 'QR001',
    status: 'delivered',
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890'
  },
  {
    id: 'P002',
    name: 'Fresh Tomatoes',
    type: 'Vegetables',
    farmerId: '1',
    farmerName: 'Rajesh Kumar',
    harvestDate: '2024-01-20',
    quantity: 200,
    quality: 'A',
    price: 25,
    location: 'Punjab, India',
    certifications: ['Pesticide-free', 'Fresh'],
    qrCode: 'QR002',
    status: 'in-transit',
    blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890ab'
  },
  {
    id: 'P003',
    name: 'Organic Milk',
    type: 'Dairy',
    farmerId: '1',
    farmerName: 'Rajesh Kumar',
    harvestDate: '2024-01-22',
    quantity: 100,
    quality: 'A+',
    price: 45,
    location: 'Punjab, India',
    certifications: ['Organic', 'Grade A', 'Fresh'],
    qrCode: 'QR003',
    status: 'harvested',
    blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcd'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'T001',
    productId: 'P001',
    from: 'Rajesh Kumar (Farmer)',
    to: 'Green Valley Retail',
    timestamp: '2024-01-16T10:30:00Z',
    type: 'transfer',
    hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
    verified: true,
    amount: 42500
  },
  {
    id: 'T002',
    productId: 'P002',
    from: 'Rajesh Kumar (Farmer)',
    to: 'Transport Co.',
    timestamp: '2024-01-21T14:15:00Z',
    type: 'transfer',
    hash: '0x2b3c4d5e6f7890abcdef1234567890ab',
    verified: true,
    amount: 5000
  },
  {
    id: 'T003',
    productId: 'P003',
    from: 'Farm',
    to: 'Rajesh Kumar (Farmer)',
    timestamp: '2024-01-22T08:00:00Z',
    type: 'harvest',
    hash: '0x3c4d5e6f7890abcdef1234567890abcd',
    verified: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    userId: '1',
    title: 'Payment Received',
    message: 'Payment of ₹42,500 received for Organic Basmati Rice',
    type: 'success',
    read: false,
    timestamp: '2024-01-16T11:00:00Z'
  },
  {
    id: 'N002',
    userId: '1',
    title: 'Demand Alert',
    message: 'High demand for tomatoes in Delhi market',
    type: 'info',
    read: false,
    timestamp: '2024-01-20T09:00:00Z'
  },
  {
    id: 'N003',
    userId: '2',
    title: 'Shipment Update',
    message: 'Your order P002 is in transit',
    type: 'info',
    read: true,
    timestamp: '2024-01-21T15:00:00Z'
  }
];

export const mockAnalytics: AnalyticsData = {
  totalProducts: 1250,
  totalTransactions: 3400,
  totalFarmers: 450,
  totalRetailers: 120,
  monthlyRevenue: 2850000,
  qualityDistribution: {
    'A+': 45,
    'A': 35,
    'B': 15,
    'C': 5
  },
  popularCrops: [
    { name: 'Rice', count: 180 },
    { name: 'Wheat', count: 150 },
    { name: 'Tomato', count: 120 },
    { name: 'Milk', count: 90 },
    { name: 'Potato', count: 80 }
  ]
};