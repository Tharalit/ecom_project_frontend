import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { formatNumber } from "../../utils/formatNumber";
import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ease: "easeOut", duration: 0.3 }}
    >
      <div className="border rounded-md shadow-md p-2 w-48">
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              className="rounded-md h-24 w-full object-cover hover:scale-110 transition shadow"
              src={item.images[0].url}
              alt=""
            />
          ) : (
            <div className="bg-slate-200 w-full h-24 rounded-md flex items-center justify-center shadow hover:scale-110 transition">
              No Image
            </div>
          )}
        </div>

        <div className="py-2">
          <p className="text-xl truncate">{item.title}</p>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{formatNumber(item.price)} Baht</span>
          <button
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 hover:text-white transition shadow"
            onClick={() => actionAddToCart(item)}
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
