import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { Purchase } from "../tyeps";
import { fetcher } from "../utils/fetcher";

export default function PurchasesTable() {
  const { data } = useQuery<Purchase[]>({
    queryKey: ["purchases"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.PURCHASES;
      const res = await fetcher(url, {
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
      </TableHeader>
      <TableBody>
        {data.map((purchase, index) => (
          <TableRow key={index}>
            <TableCell>{purchase.detail.name}</TableCell>
            <TableCell>
              {purchase.detail.color ? purchase.detail.color.name : "Нет"}
            </TableCell>
            <TableCell>{purchase.count}</TableCell>
            <TableCell>{purchase.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
