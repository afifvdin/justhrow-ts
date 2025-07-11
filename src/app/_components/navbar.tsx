import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentSession } from "@/services/session";
import { NavbarItems } from "./navbar-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { logoutAction } from "../auth/actions";

export async function Navbar() {
  const session = await getCurrentSession();
  const user = session?.user;

  if (!session || !session.user) {
    return <NavbarItems />;
  }

  return (
    <div className="flex items-center justify-end gap-3 p-4">
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon /> Profile
          </DropdownMenuItem>
          <form action={logoutAction}>
            <DropdownMenuItem asChild>
              <button type="submit" className="flex w-full items-center gap-2">
                <LogOutIcon />
                Logout
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
