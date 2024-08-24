import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { createClient } from "~/lib/supabase/client";

export default function UserNavigation() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    getUser();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  const initials = `${user?.user_metadata.first_name[0]}${user?.user_metadata.last_name[0]}`;

  return (
    <>
      <div>
        <p className="text-sm text-right font-medium leading-none">
          {user?.user_metadata.first_name}
        </p>
        <p className="text-sm  text-right text-muted-foreground">
          {user?.email}
        </p>
      </div>{" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
