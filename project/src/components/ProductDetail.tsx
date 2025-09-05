import React, { useState } from 'react';
import { X, MapPin, Calendar, Award, Shield, QrCode, Truck, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Product, Transaction } from '../types';

interface ProductDetailProps {
  product: Product;
  transactions: Transaction[];
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, transactions, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showQR, setShowQR] = useState(false);

  const productTransactions = transactions.filter(t => t.productId === product.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'harvested': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-transit': return <Truck className="w-5 h-5 text-yellow-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'sold': return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default: return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const QRCodeDisplay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Product QR Code</h3>
          <button onClick={() => setShowQR(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg text-center mb-4">
          <div className="w-32 h-32 mx-auto bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mt-2">QR Code: {product.qrCode}</p>
        </div>
        <p className="text-sm text-gray-600">Scan this code to access complete product traceability</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-600">{product.type} • Product ID: {product.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              {['overview', 'traceability', 'blockchain'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Status</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(product.status)}
                        <span className="text-sm font-medium capitalize">{product.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Quality Grade</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {product.quality}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Price per kg</span>
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Quantity Available</span>
                      <span className="text-sm font-medium text-gray-900">{product.quantity} kg</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Location</span>
                        <p className="text-sm text-gray-900">{product.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Harvest Date</span>
                        <p className="text-sm text-gray-900">{new Date(product.harvestDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Farmer</span>
                        <p className="text-sm text-gray-900">{product.farmerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowQR(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>View QR Code</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'traceability' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Supply Chain Journey</h3>
                
                <div className="space-y-4">
                  {productTransactions.map((transaction, index) => (
                    <div key={transaction.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.verified ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {transaction.verified ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 capitalize">
                            {transaction.type} Transaction
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(transaction.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          From: <span className="font-medium">{transaction.from}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          To: <span className="font-medium">{transaction.to}</span>
                        </p>
                        
                        {transaction.amount && (
                          <p className="text-sm text-gray-600 mt-1">
                            Amount: <span className="font-medium">₹{transaction.amount.toLocaleString()}</span>
                          </p>
                        )}

                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.verified 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.verified ? 'Verified' : 'Pending'}
                          </span>
                          <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>View on Blockchain</span>
                          </button>
                        </div>
                      </div>

                      {index < productTransactions.length - 1 && (
                        <div className="absolute left-5 mt-10 w-0.5 h-8 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Blockchain Record</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Blockchain Hash</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Copy</button>
                  </div>
                  <p className="text-sm font-mono text-gray-900 bg-white p-2 rounded border break-all">
                    {product.blockchainHash}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Security</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>SHA-256 Encrypted</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Immutable Record</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Tamper-Proof</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Verification</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Smart Contract Verified</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Multi-Node Consensus</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Quality Assured</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Blockchain Network</h4>
                  <p className="text-sm text-blue-700">
                    This product is recorded on a permissioned Hyperledger Fabric network, 
                    ensuring scalability, security, and compliance with agricultural standards.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showQR && <QRCodeDisplay />}
    </>
  );
};

export default ProductDetail;