import { z } from "zod";

export const authFormSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(1, { message: "O nome é obrigatório." }),
    taxNumber: z
      .string()
      .min(11, { message: "CPF ou CNPJ inválido." })
      .max(14, { message: "CPF ou CNPJ inválido." }),
    mail:
      type === "sign-in"
        ? z.string().optional()
        : z.string().email({
            message: "Endereço de email inválido. Insira um email válido.",
          }),
    phone:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(10, { message: "Número de telefone inválido." }),
    password:
      type === "sign-in"
        ? z
            .string()
            .min(1, { message: "Este campo não pode ser deixado em branco." })
        : z
            .string()
            .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  });

export const productFormSchema = (type: "create" | "update") =>
  z.object({
    name:
      type === "create"
        ? z.string().min(1, { message: "O nome do produto é obrigatório." })
        : z.string().optional(),
    description: z.string().optional(),
    price:
      type === "create"
        ? z
            .string({ message: "O preço do produto é obrigatório." })
            .transform((value) => value.replace(",", "."))
            .refine((value) => !isNaN(+value) && +value > 0, {
              message: "O preço deve ser um número positivo.",
            })
        : z
            .string()
            .transform((value) => value.replace(",", "."))
            .refine((value) => !isNaN(+value) && +value > 0, {
              message: "O preço deve ser um número positivo.",
            })
            .optional(),
    stock:
      type === "create"
        ? z
            .string({ message: "A quantidade do produto é obrigatória." })
            .refine((value) => Number.isInteger(+value) && +value > 0, {
              message:
                "A quantidade deve ser um número inteiro maior que zero.",
            })
        : z
            .string()
            .refine((value) => Number.isInteger(+value) && +value > 0, {
              message:
                "A quantidade deve ser um número inteiro maior que zero.",
            })
            .optional(),
  });
