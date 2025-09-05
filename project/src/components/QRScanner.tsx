import React, { useState } from 'react';
import { QrCode, Search, Camera, CheckCircle, X } from 'lucide-react';
import { Product } from '../types';

interface QRScannerProps {
  products: Product[];
  onProductFound: (product: Product) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ products, onProductFound }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const [scanResult, setScanResult] = useState<Product | null>(null);

  const handleSearch = () => {
    const foundProduct = products.find(p => p.qrCode === searchCode);
    if (foundProduct) {
      setScanResult(foundProduct);
      onProductFound(foundProduct);
    } else {
      alert('Product not found. Please check the QR code.');
    }
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setScanResult(randomProduct);
      setIsScanning(false);
      onProductFound(randomProduct);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <QrCode className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Traceability</h2>
        <p className="text-gray-600">Scan or search for QR codes to access complete farm-to-fork information</p>
      </div>

      {/* QR Scanner Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Camera Scanner */}
          <div className="text-center">
            <div className="w-full max-w-md mx-auto">
              <div className={`aspect-square border-2 border-dashed ${isScanning ? 'border-green-500' : 'border-gray-300'} rounded-xl flex items-center justify-center relative overflow-hidden`}>
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Scanning QR code...</p>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Position QR code within frame</p>
                    <button
                      onClick={simulateQRScan}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Scanning
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Search */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Search</h3>
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter QR code (e.g., QR001, QR002, QR003)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sample QR Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors"
              onClick={() => {
                setSearchCode(product.qrCode);
                setScanResult(product);
                onProductFound(product);
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-600">Code: {product.qrCode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-900">Product Found!</h3>
              <p className="text-green-700 mt-1">
                Successfully scanned: <strong>{scanResult.name}</strong>
              </p>
              <p className="text-sm text-green-600 mt-2">
                Click on the product card above to view complete traceability information.
              </p>
            </div>
            <button
              onClick={() => setScanResult(null)}
              className="text-green-600 hover:text-green-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Complete farm-to-fork journey</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Farmer and location verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Quality certifications</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Blockchain verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Freshness guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Smart contract transparency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;