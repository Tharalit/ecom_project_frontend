import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../APIs/user";
import { toast } from "react-toastify";
import { formatNumber } from "../../utils/formatNumber";

export default function ListCart() {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate();

  const handleSaveCart = () => {
    createUserCart(token, { cart })
      .then((res) => {
        toast.success("Success.");
        navigate("/checkout");
      })
      .catch((error) => {
        toast.warning(error.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <ListCheck size={36} />
        <p className="text-2xl font-semibold">List of {cart.length} products.</p>
      </div>
      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        {/* Left */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item, index) => (
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
                    <p className="text-sm text-gray-500">
                      {formatNumber(item.price)} x {formatNumber(item.count)}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div>
                  <div className="font-bold ">{formatNumber(item.price * item.count)} Baht</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-2xl font-bold">Total</p>
          <div className="flex justify-between">
            <span>Total net</span>
            <span className="text-2xl">{formatNumber(getTotalPrice())} Baht</span>
          </div>
          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className={`${
                    cart.length < 1 ? "bg-red-200" : "bg-red-500 hover:bg-red-700"
                  } w-full rounded-md text-white py-2 shadow-md `}
                >
                  Order product
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-md text-white py-2 shadow-md hover:bg-blue-700">
                  Please login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700">
                Edit product list
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
