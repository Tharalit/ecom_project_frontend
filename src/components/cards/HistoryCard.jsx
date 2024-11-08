import React, { useEffect, useState } from "react";
import { getOrder } from "../../APIs/user";
import useEcomStore from "../../store/ecom-store";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";

function HistoryCard() {
  const token = useEcomStore((state) => state.token);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrder(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order history</h1>

      {/* คลุมทั้งหมด */}
      <div className="space-y-6">
        {/* Card Loop order*/}
        {orders?.map((item, index) => {
          console.log(item.products.c)
          return (
            <div key={index} className="bg-gray-100 rounded-md p-4 shadow-md">
              {/* header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="font-semibold">{formatDate(item.updatedAt)}</p>
                </div>
                <div className={`${handleChangeStatusColor(item.orderStatus)} px-2 rounded-full`}>
                  {item.orderStatus}
                </div>
              </div>
              {/* table Loop Product*/}
              <div>
                <table className="border w-full ">
                  <thead>
                    <tr className="border bg-gray-200">
                      <th className="border">Product</th>
                      <th className="border">Price</th>
                      <th className="border">Quantity</th>
                      <th className="border">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products?.map((product, index) => {
                      
                      return (
                        <tr key={index} className="border text-center">
                          <td className="border">{product.product.title}</td>
                          <td className="border">{formatNumber(product.product.price)}</td>
                          <td className="border">{formatNumber(product.count)}</td>
                          <td className="border">
                            {formatNumber(product.product.price * product.count)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* total */}
              <div>
                <div className="text-right">
                  <p>Net total</p>
                  <p>{formatNumber(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryCard;
