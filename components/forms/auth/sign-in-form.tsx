"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export const metadata = {
  title: "Crie sua conta",
};

const schema = z.object({
  email: z
    .string({ required_error: "E-mail é um campo obrigatório" })
    .email({ message: "E-mail deve ser válido" }),
  password: z.string({ required_error: "Senha é um campo obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleSignIn(data: FormData) {
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        toast.error("Oops. Ocorreu um erro no seu login!");
        return;
      }

      toast.success("Logado com sucesso!");
    } catch (err) {
      toast.error("Oops. Ocorreu um erro no seu login!");
    }
  }

  return (
    <Card className="mx-auto w-[420px]">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="max@robinson.com"
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
                  <div className="flex items-center">
                    <FormLabel>Senha</FormLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Esqueceu a sua senha?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/auth/sign-up" className="underline">
                Criar
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
