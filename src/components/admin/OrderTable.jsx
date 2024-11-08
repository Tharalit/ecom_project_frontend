import React, { useEffect, useState } from "react";
import { changeOrderStatus, getOrderAdmin } from "../../APIs/admin";
import useEcomStore from "../../store/ecom-store";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";

function OrderTable() {
  const token = useEcomStore((state) => state.token);

  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    handleGetAdminOrder(token);
  }, []);

  const handleGetAdminOrder = async (token) => {
    try {
      const res = await getOrderAdmin(token);
      setAdminOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangOrderStatus = async (token, orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(token, orderId, orderStatus);
      handleGetAdminOrder(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-300";
      case "Processing":
        return "bg-yellow-300";
      case "Completed":
        return "bg-green-300";
      case "Canceled":
        return "bg-red-300";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>Order</th>
              <th>Custommer</th>
              <th>Date</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {adminOrders?.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>
                  <td className="text-center">{formatDate(item.createdAt)}</td>
                  <td className="px-2 py-4 text-center">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title}{" "}
                        <span className="text-sm text-gray-600">
                          {formatNumber(product.count)} x {formatNumber(product.product.price)}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td className="text-center">{formatNumber(item.cartTotal)}</td>
                  <td className="text-center">
                    <span
                      className={`${handleChangeStatusColor(
                        item.orderStatus
                      )} px-2 py-1 rounded-full `}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    <select
                      value={item.orderStatus}
                      className="focus:outline-none"
                      onChange={(e) => handleChangOrderStatus(token, item.id, e.target.value)}
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Canceled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
