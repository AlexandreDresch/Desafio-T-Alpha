import api from "./api";

export async function createProduct({
  name,
  price,
  stock,
  description,
  token,
}: CreateProductParams) {
  const data = {
    name,
    price,
    stock,
    description,
  };

  const response = await api.post("/api/products/create-product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function getProducts({
  token,
}: {
  token: string;
}): Promise<Product[]> {
  const response = await api.get("/api/products/get-all-products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.products;
}

export async function updateProduct({ id, data, token }: EditProductParams) {
  const response = await api.patch(`/api/products/update-product/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function deleteProduct({ id, token }: DeleteProductParams) {
  const response = await api.delete(`/api/products/delete-product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
