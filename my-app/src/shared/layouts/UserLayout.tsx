import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import LogoutButton from "@/features/auth/pages/Logout";

function AdminLayout() {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="border-b bg-background sticky top-0 z-50">
        <nav className="max-w-4xl mx-auto flex h-16 items-center justify-between px-6">
          <Link
            to="/"
            className="font-bold text-xl tracking-tight hover:text-primary transition-colors"
          >
            Admin Panel
          </Link>

          <div className="flex gap-4 items-center">
            <NavigationMenu>
              <NavigationMenuItem className="list-none">
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "/" &&
                        "bg-primary/10 text-primary font-bold underline",
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>

            {token ? (
              <>
                <NavigationMenu>
                  <NavigationMenuItem className="list-none">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/profile"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === "/profile" &&
                            "bg-primary/10 text-primary font-bold underline",
                        )}
                      >
                        Profile
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuItem className="list-none">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/rituals"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === "/rituals" &&
                            "bg-primary/10 text-primary font-bold underline",
                        )}
                      >
                        Rituals
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenu>

                <LogoutButton />
              </>
            ) : (
              <NavigationMenu>
                <NavigationMenuItem className="list-none">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/login"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === "/login" &&
                          "bg-primary/10 text-primary font-bold underline",
                      )}
                    >
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenu>
            )}
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-muted/40 py-6 text-center text-sm text-muted-foreground">
        &copy; 2024 ShopApp. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminLayout;
