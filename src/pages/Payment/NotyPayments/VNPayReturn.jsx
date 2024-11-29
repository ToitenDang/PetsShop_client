import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VNPayReturn = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusColor, setStatusColor] = useState(''); // Thêm trạng thái màu sắc

  useEffect(() => {
    // Lấy các tham số từ URL query
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const orderId = queryParams.get('orderId');
    const customerId = queryParams.get('customerId');
    const amount = queryParams.get('amount');
    const transactionNo = queryParams.get('transactionNo');

    console.log("Query Params:", { status, orderId, customerId, amount, transactionNo }); // Kiểm tra các tham số

    // Kiểm tra trạng thái và hiển thị thông tin
    if (status === 'success') {
      setPaymentStatus('Payment was successful!');
      setStatusColor('green'); // Đặt màu xanh lá cho thành công
      setOrderDetails({
        orderId,
        customerId,
        amount,
        transactionNo
      });
    } else if (status === 'failed') {
      setPaymentStatus('Payment failed. Please try again.');
      setStatusColor('red'); // Đặt màu đỏ cho thất bại
    } else if (status === 'error') {
      setPaymentStatus('There was an error processing the payment.');
      setStatusColor('red'); // Đặt màu đỏ cho lỗi hệ thống
      setErrorMessage('An unexpected error occurred. Please contact support.');
    } else {
      setPaymentStatus('Unknown status. Please try again.');
      setStatusColor('orange'); // Đặt màu cam cho trạng thái không xác định
    }
  }, [location]);

  return (
    <div className="payment-result" style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: statusColor }}>{paymentStatus}</h2> {/* Áp dụng màu cho h2 */}

      {/* Hiển thị thông tin đơn hàng khi thanh toán thành công */}
      {paymentStatus === 'Payment was successful!' && orderDetails && (
        <div className="order-details" style={{ marginTop: '20px' }}>
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Customer ID:</strong> {orderDetails.customerId}</p>
          <p><strong>Amount:</strong> {orderDetails.amount}</p>
          <p><strong>Transaction No:</strong> {orderDetails.transactionNo}</p>
        </div>
      )}

      {/* Hiển thị thông báo lỗi nếu thanh toán thất bại */}
      {paymentStatus === 'Payment failed. Please try again.' && (
        <div className="error-message" style={{ marginTop: '20px', color: 'red' }}>
          <p>Something went wrong. Please check your payment details and try again.</p>
        </div>
      )}

      {/* Hiển thị thông báo khi có lỗi hệ thống */}
      {paymentStatus === 'There was an error processing the payment.' && errorMessage && (
        <div className="error-message" style={{ marginTop: '20px', color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Các nút hành động */}
      <div className="action-buttons" style={{ marginTop: '20px' }}>
        <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default VNPayReturn;
