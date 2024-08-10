import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "../forms/product-form";

export default function CreateProductModal({
  isOpen,
  onClose,
}: CreateProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as características do produto. Clique em{" "}
            <span className="font-semibold">Criar Produto</span> quando estiver
            pronto.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <ProductForm type="create" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
