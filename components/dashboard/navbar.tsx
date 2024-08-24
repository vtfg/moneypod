import Link from "next/link";

import { cn } from "~/lib/utils";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="#"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Visão geral
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Orçamento
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transações
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Configurações
      </Link>
    </nav>
  );
}
