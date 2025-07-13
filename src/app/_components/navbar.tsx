import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentSession } from "@/services/session";
import { logoutAction } from "../auth/actions";
import { NavbarItems } from "./navbar-items";
import { Navigation } from "./navigation";

export async function Navbar() {
  const session = await getCurrentSession();
  const user = session?.user;

  if (!session || !session.user) {
    return <NavbarItems />;
  }

  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <Navigation />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-full">
          <Avatar>
            <AvatarImage src={user?.avatarUrl ?? ""} />
            <AvatarFallback className="uppercase">
              {user?.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="min-w-48 font-medium"
        >
          <DropdownMenuLabel>
            <p>My Account</p>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action={logoutAction}>
            <DropdownMenuItem
              asChild
              className="!text-destructive hover:!text-destructive"
            >
              <button type="submit" className="flex w-full items-center gap-2">
                <LogOutIcon className="!text-destructive hover:!text-destructive" />
                Logout
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
