import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import useUser from "./hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { Detail } from "../tyeps";

export default function DetailsTable() {
  const user = useUser();
  const isUser = user
    ? user?.roles.includes("ROLE_USER") && !user.roles.includes("ROLE_ADMIN")
    : false;

  const { data } = useQuery<Detail[]>({
    queryKey: ["details"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.DETAILS;
      const res = await fetch(url, {
        method: "GET",
      });
      return await res.json();
    },
    initialData: [],
  });

  return (
    <Table aria-label="Details table">
      <TableHeader className="font-bold">
        <TableColumn className="font-bold">НАЗВАНИЕ</TableColumn>
        <TableColumn className="font-bold">ЦВЕТ</TableColumn>
        <TableColumn className="font-bold">КОЛИЧЕСТВО</TableColumn>
        <TableColumn className="font-bold">ЦЕНА</TableColumn>
        <TableColumn className="font-bold">ДЕЙСТВИЯ</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((detail, index) => (
          <TableRow key={index}>
            <TableCell>{detail.name}</TableCell>
            <TableCell>{detail.color ? detail.color.name : "Нет"}</TableCell>
            <TableCell>{detail.count}</TableCell>
            <TableCell>{detail.sellPrice}</TableCell>
            <TableCell>
              <Button size="sm" color="success" isDisabled={!isUser}>
                Купить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
