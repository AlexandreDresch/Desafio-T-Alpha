import useAsync from "../use-async";

import * as productsApi from "../../services/products-api";

export default function useDeleteProduct() {
  const {
    loading: deleteProductLoading,
    error: deleteProductError,
    act: deleteProduct,
  } = useAsync(productsApi.deleteProduct, false);

  return {
    deleteProductLoading,
    deleteProductError,
    deleteProduct,
  };
}
