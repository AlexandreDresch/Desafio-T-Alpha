import { useContext } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

import CustomInput from "../custom-input";

import { productFormSchema } from "@/lib/schemas";

import { Loader2 } from "lucide-react";

import useCreateProduct from "@/hooks/api/use-create-product";

import useUpdateProduct from "@/hooks/api/use-update-product";

import useToken from "@/hooks/use-token";

import { toast } from "sonner";

import UserContext from "@/context/user-context";

export default function ProductForm({
  type,
  product,
  onFinish,
}: ProductFormProps) {
  const { createProduct, createProductLoading } = useCreateProduct();
  const { updateProduct, updateProductLoading } = useUpdateProduct();

  const { refresh } = useContext(UserContext);

  const token = useToken();

  const formSchema = productFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price.toString() || undefined,
      stock: product?.stock.toString() || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "create") {
        const productData = {
          name: values.name!,
          description: values.description,
          price: +values.price!,
          stock: +values.stock!,
          token,
        };

        createProduct(productData);
        form.reset();
        refresh();

        toast.success("Produto criado com sucesso!");
      }

      if (type === "update" && product) {
        const updatedProductData: Partial<Product> = {};

        if (values.name !== product.name) {
          updatedProductData.name = values.name!;
        }

        if (values.description !== product.description) {
          updatedProductData.description = values.description;
        }

        if (+values.price! !== product.price) {
          updatedProductData.price = +values.price!;
        }

        if (+values.stock! !== product.stock) {
          updatedProductData.stock = +values.stock!;
        }

        if (Object.keys(updatedProductData).length > 0) {
          updateProduct({
            id: product.id,
            data: updatedProductData,
            token,
          });
        }

        if (onFinish) {
          onFinish();
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        type === "create"
          ? "Erro ao criar produto."
          : "Erro ao atualizar produto.",
        {
          description: "Verifique os dados do produto e tente novamente.",
        },
      );
    }
  }

  return (
    <section className="auth-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            control={form.control}
            name="name"
            label="Nome"
            placeholder="TV, Rádio, ..."
            type="text"
            formSchema={formSchema}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva o produto..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomInput
            control={form.control}
            name="price"
            label="Preço:"
            placeholder="99.00"
            type="text"
            formSchema={formSchema}
          />

          <CustomInput
            control={form.control}
            name="stock"
            label="Quantidade:"
            placeholder="100"
            type="text"
            formSchema={formSchema}
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="form-btn"
              disabled={createProductLoading || updateProductLoading}
            >
              {createProductLoading || updateProductLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "create" ? (
                "Criar Produto"
              ) : (
                "Atualizar Produto"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
