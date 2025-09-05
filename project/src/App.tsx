import React, { useState } from 'react';
import { Home, Package, QrCode, FileText, BarChart3 } from 'lucide-react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import QRScanner from './components/QRScanner';
import TransactionLedger from './components/TransactionLedger';
import { mockUsers, mockProducts, mockTransactions, mockNotifications, mockAnalytics } from './data/mockData';
import { Product, User } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState('farmer');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentRole('farmer');
    setActiveTab('dashboard');
    setSelectedProduct(null);
  };

  // Get user based on current role
  const getCurrentUser = () => {
    if (currentUser) return currentUser;
    return mockUsers.find(user => user.role === currentRole) || mockUsers[0];
  };

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  const unreadNotifications = mockNotifications.filter(n => 
    n.userId === getCurrentUser().id && !n.read
  ).length;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
    // Update current user role for demo purposes
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: role as 'farmer' | 'retailer' | 'consumer'
      });
    }
  };

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', name: 'Dashboard', icon: Home },
      { id: 'products', name: currentRole === 'farmer' ? 'My Products' : currentRole === 'retailer' ? 'Inventory' : 'Products', icon: Package },
      { id: 'transactions', name: 'Blockchain Ledger', icon: FileText },
    ];

    if (currentRole === 'consumer') {
      baseItems.splice(2, 0, { id: 'scanner', name: 'QR Scanner', icon: QrCode });
    }

    if (currentRole === 'retailer') {
      baseItems.push({ id: 'analytics', name: 'Analytics', icon: BarChart3 });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={getCurrentUser()} 
        notifications={unreadNotifications}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        currentRole={currentRole}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Role Badge */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Current Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize mt-1">{currentRole}</p>
                <div className="mt-2">
                  <div className={`w-2 h-2 rounded-full inline-block mr-2 ${
                    currentRole === 'farmer' ? 'bg-green-500' :
                    currentRole === 'retailer' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-xs text-gray-600">Active</span>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'dashboard' && (
              <Dashboard analytics={mockAnalytics} role={currentRole} />
            )}

            {activeTab === 'products' && (
              <ProductList 
                products={mockProducts} 
                role={currentRole}
                onProductClick={handleProductClick}
              />
            )}

            {activeTab === 'scanner' && (
              <QRScanner 
                products={mockProducts}
                onProductFound={handleProductClick}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionLedger transactions={mockTransactions} />
            )}

            {activeTab === 'analytics' && (
              <Dashboard analytics={mockAnalytics} role={currentRole} />
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          transactions={mockTransactions}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;