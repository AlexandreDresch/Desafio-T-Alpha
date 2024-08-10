import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "../forms/product-form";

export default function EditProductModal({
  isOpen,
  product,
  onClose,
}: EditProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Faça mudanças no produto aqui. Clique em{" "}
            <span className="font-semibold">Atualizar Produto</span> quando
            estiver pronto.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <ProductForm type="update" product={product} onFinish={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
