import AuthForm from "@/components/forms/auth-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <Tabs defaultValue="login" className="w-full max-w-[500px]">
          <TabsList>
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <AuthForm type="sign-in" />
          </TabsContent>
          <TabsContent value="register">
            <AuthForm type="sign-up" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
