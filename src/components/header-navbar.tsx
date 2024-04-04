import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Home } from "lucide-react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAutoCheckTokenExpiration from "./hooks/useAutoCheckTokenExpiration";
import { toast } from "sonner";
import useUser from "./hooks/useUser";
import Cookies from "js-cookie";

export default function HeaderNavbar() {
  const location = useLocation().pathname;
  useAutoCheckTokenExpiration(() =>
    toast.info("Сессия зарегестрированного пользователя завершена.")
  );

  const user = useUser();
  console.log(user);
  const navigate = useNavigate();

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
        {!user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link as={ReactRouterLink} to="/sign-in">
                Войти
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={ReactRouterLink}
                color="primary"
                to="/sign-up"
                variant="flat"
              >
                Зарегестрироваться
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              color="danger"
              onClick={() => {
                Cookies.remove("token");
                navigate("/sign-in");
              }}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
