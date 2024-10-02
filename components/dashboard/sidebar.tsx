"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog, Coins, LineChart, Menu, Table } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";
import { Logo } from "~/components/logo";
import { cn } from "~/lib/utils";

export function DesktopSidebar() {
  const currentPath = usePathname();

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              "bg-muted text-primary": currentPath === "/dashboard",
            }
          )}
        >
          <LineChart className="h-4 w-4" />
          Visão geral
        </Link>
        <Link
          href="/dashboard/budget"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              "bg-muted text-primary": currentPath === "/dashboard/budget",
            }
          )}
        >
          <Coins className="h-4 w-4" />
          Orçamento
        </Link>
        <Link
          href="/dashboard/transactions"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              "bg-muted text-primary":
                currentPath === "/dashboard/transactions",
            }
          )}
        >
          <Table className="h-4 w-4" />
          Transações
        </Link>
        <Link
          href="#"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              "bg-muted text-primary": currentPath === "/dashboard/settings",
            }
          )}
        >
          <Cog className="h-4 w-4" />
          Configuração
        </Link>
      </nav>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link href="#">
            <Logo />
          </Link>
          <Separator />
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Visão geral
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Coins className="h-5 w-5" />
            Orçamento
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Table className="h-5 w-5" />
            Transações
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Cog className="h-5 w-5" />
            Configurações
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
