import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../components/Typography';
import { Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
  const orders = useOrderStore(state => state.orders);

  const ongoingOrders = orders.filter(o => o.status !== 'Completed');
  const historyOrders = orders.filter(o => o.status === 'Completed');

  const displayOrders = activeTab === 'ongoing' ? ongoingOrders : historyOrders;

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm border-b border-gray-100 flex justify-center items-center">
        <Typography variant="h2">My Orders</Typography>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-mixue-red to-red-500 rounded-2xl p-5 mb-6 text-white shadow-card flex items-center justify-between">
          <div>
            <Typography variant="caption" className="text-red-100 mb-1">Total Orders</Typography>
            <Typography variant="h1" className="text-3xl text-white">{orders.length}</Typography>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <ShoppingBag size={24} className="text-white" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'ongoing' ? 'bg-white text-mixue-red shadow-sm' : 'text-mixue-gray'}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing ({ongoingOrders.length})
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'history' ? 'bg-white text-mixue-red shadow-sm' : 'text-mixue-gray'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {displayOrders.length > 0 ? (
            displayOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {order.status === 'Completed' ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <Clock size={16} className="text-yellow-500" />
                    )}
                    <span className="text-sm font-semibold">{order.status}</span>
                  </div>
                  <span className="text-xs text-mixue-gray">{order.date}</span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium text-mixue-dark">Order ID: {order.id}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.products.map((p, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-mixue-gray">
                        <span>{p.qty}x {p.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-sm text-mixue-gray">Total Amount</span>
                    <span className="text-base font-bold text-mixue-dark">Rp {order.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div 
                  className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer active:bg-gray-100"
                  onClick={() => navigate(`/tracking/${order.id}`)}
                >
                  <span className="text-sm font-medium text-mixue-red">View Details</span>
                  <ChevronRight size={16} className="text-mixue-red" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <Typography variant="h3" className="mb-2">No {activeTab} orders</Typography>
              <Typography variant="body1" className="text-mixue-gray text-sm">When you place an order, it will appear here.</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};