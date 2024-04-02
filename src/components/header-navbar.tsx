import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Home } from "lucide-react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export default function HeaderNavbar() {
  const location = useLocation().pathname;
  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Button isIconOnly as={ReactRouterLink} to="/" variant="light">
          <Home />
        </Button>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location === "/details"}>
          <Link
            className="[data[active=true]]:font-bold"
            as={ReactRouterLink}
            color="foreground"
            to="/details"
          >
            Детали
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location === "/purchases"}>
          <Link
            className="[data[active=true]]:font-bold"
            as={ReactRouterLink}
            color="foreground"
            to="/purchases"
          >
            Покупки
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location === "/sells"}>
          <Link
            className="[data[active=true]]:font-bold"
            as={ReactRouterLink}
            color="foreground"
            to="/sells"
          >
            Продажи
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link as={ReactRouterLink} to="/">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={ReactRouterLink} color="primary" to="/" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
