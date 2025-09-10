// pages/AdminUserPayments.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, DollarSign } from 'lucide-react';
import PaymentHistory from '../components/PaymentHistory';

const AdminUserPayments = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data and payments (replace with your API calls)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API calls
        setTimeout(() => {
          setUser({
            _id: userId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            meterId: 'MTR001'
          });
          
          setPayments([
            {
              _id: '1',
              amount: 75.50,
              paymentMethod: 'UPI',
              transactionId: 'TXN123456789',
              status: 'success',
              createdAt: '2023-12-15T10:30:00Z',
              receiptNumber: 'RCPT001234',
              meterId: 'MTR001'
            },
            {
              _id: '2',
              amount: 120.00,
              paymentMethod: 'Card',
              transactionId: 'TXN987654321',
              status: 'success',
              createdAt: '2023-11-28T14:45:00Z',
              receiptNumber: 'RCPT001235',
              meterId: 'MTR001'
            }
          ]);
          
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/admin/user-list" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Users
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="body-sm   text-gray-500">Meter ID: {user.meterId}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <DollarSign className="w-5 h-5 mr-1" />
                <span className="heading-xl   font-bold">
                  ${payments.reduce((total, payment) => total + payment.amount, 0).toFixed(2)}
                </span>
              </div>
              <p className="body-sm   text-gray-500">Total Payments</p>
            </div>
          </div>
        </div>

        <PaymentHistory payments={payments} isAdmin={true} />
      </div>
    </div>
  );
};

export default AdminUserPayments;