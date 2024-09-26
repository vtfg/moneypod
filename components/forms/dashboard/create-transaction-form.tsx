"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { createClient } from "~/lib/supabase/client";

export const metadata = {
  title: "Crie sua conta",
};

const schema = z.object({
  type: z.any().refine((value) => !!value, "Tipo é um campo obrigatório"),
  bank: z.string({ required_error: "Banco é um campo obrigatório" }),
  description: z.string().optional(),
  category: z.string({ required_error: "Categoria é um campo obrigatório" }),
  value: z
    .string({ required_error: "Valor é um campo obrigatório" })
    .transform((val) => Number(val)),
});

type FormData = z.infer<typeof schema>;

export default function CreateTransactionForm() {
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleCreateTransaction(data: FormData) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const response = await supabase.from("transactions").insert({
        user_id: user?.id,
        ...data,
      });

      if (response.error) {
        toast.error("Oops. Ocorreu um erro na adição da sua transação!");
        return;
      }

      toast.success("Transação adicionada com sucesso!");
      setOpen(false);
    } catch (err) {
      toast.error("Oops. Ocorreu um erro na adição da sua transação!");
    }
  }

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="mt-4">Adicionar transação</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTransaction)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={(value) =>
                        field.onChange({
                          target: { value: value || null },
                        })
                      }
                      {...field}
                    >
                      <ToggleGroupItem
                        value="positive"
                        aria-label="Entrada"
                        className="transition w-full border hover:border-green-400 active:border-green-400 data-[state=on]:border-green-500 hover:bg-green-400 hover:text-black hover:brightness-90 data-[state=on]:bg-green-500 data-[state=on]:text-white active:bg-green-500 active:text-white flex gap-2"
                      >
                        <Plus className="h-4 w-4" /> Entrada
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="negative"
                        aria-label="Saída"
                        className="transition w-full border hover:border-red-400 active:border-red-400 data-[state=on]:border-red-500 hover:bg-red-400 hover:text-black hover:brightness-90 data-[state=on]:bg-red-500 data-[state=on]:text-white active:bg-red-500 active:text-white flex gap-2"
                      >
                        <Minus className="h-4 w-4" /> Saída
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banco</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <div className="relative ml-auto flex-1 md:grow-0 items-center justify-center">
                      <span className="absolute left-2.5 top-2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        className="w-full rounded-lg bg-background pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
