import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { listUserCart, saveAddress } from "../../APIs/user";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";

export default function SummaryCard() {
  const token = useEcomStore((state) => state.token);

  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart(token);
  }, []);

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        const products = res.data.products;
        const cartTotal = res.data.cartTotal;

        setProducts(products);
        setCartTotal(cartTotal);
      })
      .catch((err) => console.log(err));
  };

  const handleSaveAddress = async () => {
    try {
      if (!address) return toast.warning("Please fill shipping address");

      const res = await saveAddress(token, { address });
      toast.success(res.data.message);
      setAddressSaved(true);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleGoToPayment = () => {
    if (!addressSaved) return toast.warning("Please fill shipping address.");
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto">
      <div className="flex gap-4">
        {/* Left */}
        <div className="w-2/4">
          <div className="border bg-gray-100 p-4 rounded-md shadow-md space-y-4">
            <h1 className="text-lg font-bold">Shipping address</h1>
            <textarea
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-2"
              placeholder="Your shipping address"
            />
            <button
              onClick={handleSaveAddress}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 duration-100"
            >
              Save address
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="w-2/4">
          <div className="border p-4 rounded-md shadow-md space-y-4">
            <h1 className="text-lg font-bold">Your order</h1>
            {/* Item list */}

            {products.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">
                      Quantity: {formatNumber(item.count)} x {formatNumber(item.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 font-semibold">
                      {formatNumber(item.count * item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <hr />
            <div>
              <div className="flex justify-between">
                <p>Shipping costs:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>Discount:</p>
                <p>0.00</p>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">Net Total:</p>
                <p className="text-red-500 font-bold">{formatNumber(cartTotal)}</p>
              </div>
            </div>

            <div>
              <button
                onClick={handleGoToPayment}
                // disabled={!addressSaved}
                className="bg-green-500 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600"
              >
                Proceed with payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
