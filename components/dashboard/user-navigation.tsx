"use client";

import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { createClient } from "~/lib/supabase/client";

interface UserNavigationProps {
  user: User | null;
}

export function UserNavigation({ user }: UserNavigationProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  const initials = `${user?.user_metadata.first_name[0]}${user?.user_metadata.last_name[0]}`;

  return (
    <div className="flex items-center space-x-2">
      <div>
        <p className="text-sm text-right font-medium leading-none">
          {user?.user_metadata.first_name}
        </p>
        <p className="text-sm  text-right text-muted-foreground">
          {user?.email}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
