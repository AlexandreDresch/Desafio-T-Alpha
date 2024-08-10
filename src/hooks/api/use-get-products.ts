import useAsync from "../use-async";

import * as productsApi from "../../services/products-api";

export default function useGetProducts() {
  const {
    data: products,
    loading: getProductsLoading,
    error: getProductsError,
    act: getProducts,
  } = useAsync(productsApi.getProducts, false);

  return {
    products,
    getProductsLoading,
    getProductsError,
    getProducts,
  };
}
