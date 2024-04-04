import { Button } from "@nextui-org/react";
import Title from "../components/title";
import { Link } from "react-router-dom";
import useUser from "../components/hooks/useUser";

export default function HomePage() {
  const user = useUser();
  const isAdmin = user ? user?.roles.includes("ROLE_ADMIN") : false;

  return (
    <div className="flex flex-col items-start gap-4">
      <Title>Добро пожаловать!</Title>
      <Button
        as={Link}
        to="/details"
        color="primary"
        variant="bordered"
        size="lg"
        isDisabled={isAdmin}
      >
        Перейти к каталогу деталей
      </Button>
    </div>
  );
}
