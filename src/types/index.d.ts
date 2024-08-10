declare type SignUpParams = {
  name: string;
  taxNumber: string;
  mail: string;
  phone: string;
  password: string;
};

declare type SignInParams = {
  taxNumber: string;
  password: string;
};

declare type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

declare type ProductFormProps = {
  type: "create" | "update";
  product?: Product;
  onFinish?: () => void;
};

declare type DeleteProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

declare type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

declare type CreateProductParams = Omit<Product, "description", "id"> & {
  description?: string;
  token: string;
};

declare type EditProductParams = {
  id: number;
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
  };
  token: string;
};

declare type DeleteProductParams = {
  id: number;
  token: string;
};

declare type EditProductModalProps = {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
};

declare type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
