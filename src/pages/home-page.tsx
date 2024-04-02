import { Button } from "@nextui-org/react";
import Title from "../components/title";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Title>Добро пожаловать!</Title>
      <Button
        as={Link}
        to="/details"
        color="primary"
        variant="bordered"
        size="lg"
      >
        Перейти к каталогу деталей
      </Button>
    </div>
  );
}
