import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const dummyData = [
  {
    name: "Дверь",
    color: "Красный",
    total_price: 12000,
    count: 170,
  },
  {
    name: "Окно",
    color: "Синий",
    total_price: 8000,
    count: 50,
  },
  {
    name: "Стол",
    color: "Белый",
    total_price: 5000,
    count: 100,
  },
  {
    name: "Кухня",
    color: "Черный",
    total_price: 20000,
    count: 30,
  },
  {
    name: "Шкаф",
    color: "Зеленый",
    total_price: 15000,
    count: 80,
  },
];

export default function PurchasesTable() {
  return (
    <Table aria-label="Details table">
      <TableHeader className="font-bold">
        <TableColumn className="font-bold">НАЗВАНИЕ</TableColumn>
        <TableColumn className="font-bold">ЦВЕТ</TableColumn>
        <TableColumn className="font-bold">КОЛИЧЕСТВО</TableColumn>
        <TableColumn className="font-bold">ЦЕНА</TableColumn>
      </TableHeader>
      <TableBody>
        {dummyData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.color}</TableCell>
            <TableCell>{data.count}</TableCell>
            <TableCell>{data.total_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
