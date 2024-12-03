import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import '../css/transaction.css';

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/transaction');
        console.log('API Response:', response.data);
        setCompletedOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load transaction data');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleViewClick = async (order) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/transaction/${order.order_id}`);
        setSelectedOrder(response.data); // Fetch and set the detailed order data
        setModalOpen(true);
    } catch (error) {
        console.error('Error fetching order details:', error);
        alert('Failed to fetch order details.');
    }
};


  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/transaction');
            setCompletedOrders(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load transaction data');
            setLoading(false);
        }
    };

    fetchOrders();
}, []);

  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-CA');

  const filteredOrders = completedOrders
    .map((order) => ({
      ...order,
      id: order.order_id,
      order_date: new Date(order.order_date).toLocaleDateString('en-CA'),
    }))
    .filter((order) => order.order_date === formattedSelectedDate);

  console.log('Filtered Orders:', filteredOrders);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="transaction-container">
        <div className="header">
          <h3>Transaction History</h3>
          <div className="date-filter">
            <label htmlFor="date-picker">Date: </label>
            <input
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <DataGrid
          rows={filteredOrders}
          columns={[
            { field: 'order_date', headerName: 'Date', width: 150 },
            { field: 'order_id', headerName: 'Order No.', width: 100 },
            { field: 'order_status', headerName: 'Status', width: 150 },
            {
              field: 'action',
              headerName: 'Action',
              width: 150,
              renderCell: (params) => (
                <button
                  className="btn view_btn"
                  onClick={() => handleViewClick(params.row)}
                >
                  View
                </button>
              ),
            },
          ]}
          getRowId={(row) => row.order_id}
          autoHeight
          pageSize={5}
          pagination
          disableSelectionOnClick
        />
      </div>

      {modalOpen && (
        <div className="modal">
        <div className="modal_content">
          <h2>Order ID: {selectedOrder.order_id}</h2>
            <DataGrid
                rows={selectedOrder.items.map((item, index) => ({
                    id: index,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    total_amount: item.order_total,
                }))}
                columns={[
                    { field: 'product_name', headerName: 'Order Items', width: 200 },
                    { field: 'quantity', headerName: 'Quantity', width: 150 },
                    { field: 'total_amount', headerName: 'Amount', width: 150 },
                ]}
                autoHeight
                pageSize={5}
                disableSelectionOnClick
            />
            <button className="cancel_button" onClick={handleCloseModal}>
                Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;