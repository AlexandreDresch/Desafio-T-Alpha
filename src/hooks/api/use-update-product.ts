import useAsync from "../use-async";

import * as productsApi from "../../services/products-api";

export default function useUpdateProduct() {
  const {
    loading: updateProductLoading,
    error: updateProductError,
    act: updateProduct,
  } = useAsync(productsApi.updateProduct, false);

  return {
    updateProductLoading,
    updateProductError,
    updateProduct,
  };
}
