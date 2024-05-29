import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(3, "O numero mínimo de caracteres é 3."),
    lastname: z.string().min(3, "O numero mínimo de caracteres é 3."),
    gender: z.string().refine((field) => field !== "select", {
      message: "Você precisa escolher um gênero",
    }),
    email: z
      .string()
      .min(1, "O email é obrigatório")
      .email("O email inserido não é valido"),
    password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres."),
    confirmpassword: z
      .string()
      .min(6, "A confirmação de senha precisa ter no minimo 6 caracteres."),
    agree: z.boolean().refine((field) => field === true, {
      message: "É necessario aceitar os termos",
    }),
  })
  .refine((field) => field.password === field.confirmpassword, {
    message: "A confirmação de senha não é igual a senha",
    path: ["confirmpassword"],
  });

export type FormSchema = z.infer<typeof formSchema>;
