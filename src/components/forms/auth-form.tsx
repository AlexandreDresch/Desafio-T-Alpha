import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "../custom-input";

import { authFormSchema } from "@/lib/schemas";

import { Loader2 } from "lucide-react";

import useSignUp from "@/hooks/api/use-sign-up";
import useSignIn from "@/hooks/api/use-sign-in";

import UserContext from "@/context/user-context";

import { toast } from "sonner";

export default function AuthForm({ type }: AuthFormProps) {
  const { signUpLoading, signUp } = useSignUp();
  const { signInLoading, signIn } = useSignIn();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      taxNumber: "",
      phone: "",
      mail: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const userData = {
          name: values.name!,
          taxNumber: values.taxNumber!,
          mail: values.mail!,
          phone: values.phone!,
          password: values.password!,
        };

        await signUp(userData);

        toast.success("Conta criada com sucesso!", {
          description: "Clique em entrar para começar a usar a aplicação.",
        });
      }

      if (type === "sign-in") {
        const response = await signIn({
          taxNumber: values.taxNumber,
          password: values.password,
        });

        if (response) {
          setUserData(response.data);

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        type === "sign-in"
          ? "Erro ao acessar sua conta."
          : "Erro ao criar conta.",
        {
          description: "Verifique seus dados e tente novamente.",
        },
      );
    }
  }

  return (
    <section className="auth-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign-up" && (
            <>
              <CustomInput
                control={form.control}
                name="name"
                label="Nome"
                placeholder="John Doe"
                type="text"
                formSchema={formSchema}
              />

              <CustomInput
                control={form.control}
                name="mail"
                label="Email"
                placeholder="email@exemplo.com"
                type="email"
                formSchema={formSchema}
              />

              <CustomInput
                control={form.control}
                name="phone"
                label="Telefone:"
                placeholder="999999999"
                type="text"
                formSchema={formSchema}
              />
            </>
          )}

          <CustomInput
            control={form.control}
            name="taxNumber"
            label="CPF ou CNPJ:"
            placeholder="0000000000000"
            type="text"
            formSchema={formSchema}
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Senha:"
            placeholder="●●●●●●"
            type="password"
            formSchema={formSchema}
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={signUpLoading || signInLoading}>
              {signUpLoading || signInLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
