import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useDeleteProduct from "@/hooks/api/use-delete-product";

import { Loader2 } from "lucide-react";

export default function DeleteProductModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteProductModalProps) {
  const { deleteProductLoading } = useDeleteProduct();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Clicando em{" "}
            <span className="font-semibold">Continuar</span> você estará{" "}
            <span className="font-semibold">excluindo</span> o produto
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {deleteProductLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Continuar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
