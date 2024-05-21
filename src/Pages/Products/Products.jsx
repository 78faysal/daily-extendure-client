import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ProductCard from "../../Components/ProductCard";
import Spinner from "../../Components/Spinner";
import useAuth from "../../Hooks/useAuth";

const Products = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure(user);

  const { data: products = [], isLoading: productsLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products");
      return data;
    },
  });

  if(productsLoading){
    return <Spinner />
  }

  // console.log(products);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Products</h2>

      <div className="grid md:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product?._id}
            photoURL={product?.photoURL}
            productName={product?.productName}
            description={product?.description}
            price={product?.price}
            seller={product?.seller}
            quantity={product?.quantity}
            productInfo={product}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
