import { useEffect, useState } from "react";
import { Loader } from "../../common/ReusableComponents/Loader/Loader";
import { useParams } from "react-router-dom";

import { CategoryIcons } from "../../common/ReusableComponents/CategoryIcons/CategoryIcons";
import { ProductCard } from "../AllProducts/ProductCard";

import "../AllProducts/ProductCard.css";
import "./Category.css";

export const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Ensure loading state is reset when category changes
      setError(null);
      try {
        const response = await fetch(
          `https://cones-and-stones-ppnudpghiq-lz.a.run.app/products/category/${category}`
        );

        const data = await response.json();
        if (data.success) {
          // Simulate a delay by wrapping the state update in a setTimeout
          setTimeout(() => {
            setProducts(data.response);
            setIsLoading(false)
          }, 500);
        } else {
          setError(data.error.message);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
  return (
    <div className="category-page">
      <CategoryIcons variant="grey" />
      <h4>{category}</h4>
      {isLoading && <Loader />}

      {error && <p>Error: {error}</p>}
      
      <section className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image_url={product.image_url}
            name={product.name}
            price={product.price}
          />
        ))}
      </section>
    </div>
  );
};
