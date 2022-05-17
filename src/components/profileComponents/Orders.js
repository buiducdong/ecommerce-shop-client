import React from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import moment from 'moment';
const Orders = ({ loading, orders, error }) => {
  return (
    <div className=' d-flex justify-content-center align-items-center flex-column'>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant={'alert-danger'}>{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className='col-12 alert alert-info text-center mt-3'>
              No Orders
              <Link
                className='btn btn-success mx-2 px-3 py-2'
                to='/'
                style={{
                  fontSize: '12px',
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className={order.isPaid ? 'alert-success' : 'alert-danger'}
                    >
                      <td>
                        <a href={`/order/${order._id}`} className='link'>
                          {index + 1}
                        </a>
                      </td>
                      <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                      <td>
                        {order.paidAt
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
