import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatNumber } from "../../utils/formatNumber";

export default function SearchCard() {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([500, 60000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Step 1 Search by Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct(20);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // Step 2 Search by Category
  const handleCheck = (e) => {
    const isChecked = e.target.value;
    const inState = [...categorySelected];
    const isFound = inState.indexOf(isChecked);
    if (isFound === -1) {
      inState.push(isChecked);
    } else {
      inState.splice(isFound, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct(20);
    }
  };

  // Step 3 Search by Price
  useEffect(() => {
    actionSearchFilters({ price: price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Product</h1>
      <input
        className="border rounded w-full mb-4 pl-2 focus:outline-none"
        type="text"
        placeholder="Search product..."
        onChange={(e) => setText(e.target.value)}
      />

      <hr />
      <div className="mb-4">
        <h1 className="font-semibold">Product categories</h1>
        <div>
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <label htmlFor="">{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <hr />
      <div>
        <h1 className="font-semibold">Search by Price</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {formatNumber(price[0])}</span>
            <span>Max : {formatNumber(price[1])}</span>
          </div>
          <Slider onChange={handlePrice} range min={0} max={60000} defaultValue={[500, 60000]} />
        </div>
      </div>
    </div>
  );
}
