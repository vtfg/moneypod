"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { passwordSchema } from "~/lib/utils";
import { createClient } from "~/lib/supabase/client";

export const metadata = {
  title: "Crie sua conta",
};

const schema = z.object({
  first_name: z
    .string({ required_error: "Nome é um campo obrigatório" })
    .min(2, {
      message: "Nome deve ter no mínimo 2 caracteres.",
    }),
  last_name: z
    .string({ required_error: "Sobrenome é um campo obrigatório" })
    .min(2, {
      message: "Sobrenome deve ter no mínimo 2 caracteres.",
    }),
  email: z
    .string({ required_error: "E-mail é um campo obrigatório" })
    .email({ message: "E-mail deve ser válido" }),
  password: passwordSchema,
});

type FormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const router = useRouter();
  const supabase = createClient();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleSignUp(data: FormData) {
    try {
      const response = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      });

      if (response.error) {
        toast.error("Oops. Ocorreu um erro na criação da sua conta!");
        return;
      }

      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Oops. Ocorreu um erro na criação da sua conta!");
    }
  }

  return (
    <Card className="mx-auto w-[420px]">
      <CardHeader>
        <CardTitle className="text-xl">Cadastre-se</CardTitle>
        <CardDescription>
          e tenha acesso a uma plataforma completa para controle financeiro,
          pessoal e profissional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar minha conta
            </Button>

            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/sign-in" className="underline">
                Entrar
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
