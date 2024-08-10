import { useContext } from "react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LogOutIcon, MenuIcon } from "lucide-react";

import { Link } from "react-router-dom";

import UserContext from "@/context/user-context";

export default function Header() {
  const { logout } = useContext(UserContext);

  async function handleSignOut() {
    logout();
  }

  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Link
            to="/"
            className="text-2xl font-bold text-transparent text-white"
          >
            Desafio T-Alpha
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-72">
              <SheetHeader>
                <SheetTitle>Conta</SheetTitle>
              </SheetHeader>

              <div className="mt-4 w-full">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-full gap-2"
                  onClick={handleSignOut}
                >
                  <span>Sair</span>
                  <LogOutIcon size={12} />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
