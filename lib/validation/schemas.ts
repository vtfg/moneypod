import { z } from "zod";

export const passwordSchema = z
  .string({ required_error: "Senha é um campo obrigatório" })
  .min(4, "A senha deve ter no mínimo 4 caracteres")
  .max(64, "A senha deve ter no máximo 64 caracteres")
  .refine((value) => value.replace(/[^A-Z]/g, "").length >= 1, {
    message: "A senha deve ter no mínimo uma letra maíscula",
  })
  .refine((value) => value.replace(/[^a-z]/g, "").length >= 1, {
    message: "A senha deve ter no mínimo uma letra minúscula",
  })
  .refine((value) => value.replace(/[^!@#$%=_]/g, "").length >= 1, {
    message: "A senha deve ter no mínimo um caractere especial",
  });
