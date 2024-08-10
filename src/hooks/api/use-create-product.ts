import useAsync from "../use-async";

import * as productsApi from "../../services/products-api";

export default function useCreateProduct() {
  const {
    loading: createProductLoading,
    error: createProductError,
    act: createProduct,
  } = useAsync(productsApi.createProduct, false);

  return {
    createProductLoading,
    createProductError,
    createProduct,
  };
}
