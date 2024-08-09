import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
import Card from "../components/Card";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
      Toaster.error("Failed to fetch data");
      setProducts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="min-h-screen h-full w-full">
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="min-h-[80vh] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] max-w-6xl p-2 space-y-10 space-x-5 mx-auto">
          {products.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">No products found</h1>
        </div>
      )}
    </div>
  );
};
export default Home;
