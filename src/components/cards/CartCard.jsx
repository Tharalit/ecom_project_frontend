import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";

export default function CartCard() {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  return (
    <div>
      <h1 className="text-xl font-bold">Your cart</h1>
      {/* Border */}
      <div className="p-2">
        {/* Card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-4">
            {/* Row 1 */}
            <div className="flex justify-between items-center mb-2">
              {/* Left */}
              <div className="flex gap-2 items-center">
                {item.images && item.images.length > 0 ? (
                  <img className="w-16 h-16 rounded-md" src={item.images[0].url} alt="" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                    No Image
                  </div>
                )}

                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              {/* Right */}
              <div
                className="text-red-500 p-2 cursor-pointer"
                onClick={() => actionRemoveProduct(item.id)}
              >
                <Trash2 />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex justify-between items-center">
              {/* Left */}
              <div className="border rounded px-1 py-1 flex items-center">
                <button
                  className="bg-gray-200 px-2 py-1 rounded-sm hover:bg-gray-300"
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded-sm hover:bg-gray-300"
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              {/* Right */}
              <div className="font-bold text-blue-500">
                {formatNumber(item.price * item.count)} Baht
              </div>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between items-center px-2 mt-4">
          <span>Total:</span>
          <span>{formatNumber(getTotalPrice())} Baht</span>
        </div>
        {/* Button */}
        <Link to={"/cart"}>
          <button className="mt-4 bg-green-500 text-white rounded w-full py-2 shadow hover:bg-green-600 duration-75">
            Continue to checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
