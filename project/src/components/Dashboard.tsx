import React from 'react';
import { BarChart3, TrendingUp, Package, Users, DollarSign, Award } from 'lucide-react';
import { AnalyticsData } from '../types';

interface DashboardProps {
  analytics: AnalyticsData;
  role: string;
}

const Dashboard: React.FC<DashboardProps> = ({ analytics, role }) => {
  const getStatsForRole = () => {
    switch (role) {
      case 'farmer':
        return [
          { name: 'My Products', value: '24', icon: Package, color: 'bg-green-500' },
          { name: 'This Month Revenue', value: `₹${(analytics.monthlyRevenue / 100).toLocaleString()}`, icon: DollarSign, color: 'bg-blue-500' },
          { name: 'Quality Score', value: 'A+', icon: Award, color: 'bg-yellow-500' },
          { name: 'Active Orders', value: '8', icon: TrendingUp, color: 'bg-purple-500' }
        ];
      case 'retailer':
        return [
          { name: 'Total Inventory', value: analytics.totalProducts.toLocaleString(), icon: Package, color: 'bg-blue-500' },
          { name: 'Active Suppliers', value: analytics.totalFarmers.toString(), icon: Users, color: 'bg-green-500' },
          { name: 'Monthly Sales', value: `₹${analytics.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-yellow-500' },
          { name: 'Transactions', value: analytics.totalTransactions.toLocaleString(), icon: BarChart3, color: 'bg-purple-500' }
        ];
      case 'consumer':
        return [
          { name: 'Products Scanned', value: '45', icon: Package, color: 'bg-purple-500' },
          { name: 'Trusted Farmers', value: '12', icon: Users, color: 'bg-green-500' },
          { name: 'Savings This Month', value: '₹1,250', icon: DollarSign, color: 'bg-blue-500' },
          { name: 'Quality Verified', value: '98%', icon: Award, color: 'bg-yellow-500' }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Distribution</h3>
          <div className="space-y-4">
            {Object.entries(analytics.qualityDistribution).map(([grade, percentage]) => (
              <div key={grade} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Grade {grade}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Crops */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Crops</h3>
          <div className="space-y-4">
            {analytics.popularCrops.map((crop, index) => (
              <div key={crop.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">#{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{crop.name}</span>
                </div>
                <span className="text-sm text-gray-600">{crop.count} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role-specific content */}
      {role === 'farmer' && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmer Dashboard</h3>
          <p className="text-gray-600 mb-4">Manage your crops, track payments, and connect with buyers directly.</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Voice Support</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Smart Contracts</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Real-time Pricing</span>
          </div>
        </div>
      )}

      {role === 'retailer' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Retailer Dashboard</h3>
          <p className="text-gray-600 mb-4">Track inventory, verify suppliers, and manage your supply chain with blockchain transparency.</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Fraud Prevention</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Demand Forecasting</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Supplier Verification</span>
          </div>
        </div>
      )}

      {role === 'consumer' && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Consumer Dashboard</h3>
          <p className="text-gray-600 mb-4">Scan QR codes for complete traceability, verify product authenticity, and support sustainable farming.</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">QR Scanning</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Farm-to-Fork</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Food Safety</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;