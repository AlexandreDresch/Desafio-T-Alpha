import api from "./api";

export async function signIn({ taxNumber, password }: SignInParams) {
  const response = await api.post("/api/auth/login", { taxNumber, password });
  return response.data;
}

export async function signUp({
  name,
  taxNumber,
  mail,
  phone,
  password,
}: SignUpParams) {
  const response = await api.post("/api/auth/register", {
    name,
    taxNumber,
    mail,
    phone,
    password,
  });
  return response.data;
}
