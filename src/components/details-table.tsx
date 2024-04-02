import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const dummyData = [
  {
    name: "Дверь",
    color: "Красный",
    sell_price: 1200,
    count: 17,
  },
  {
    name: "Окно",
    color: "Синий",
    sell_price: 800,
    count: 5,
  },
  {
    name: "Стол",
    color: "Белый",
    sell_price: 500,
    count: 10,
  },
  {
    name: "Кухня",
    color: "Черный",
    sell_price: 2000,
    count: 3,
  },
  {
    name: "Шкаф",
    color: "Зеленый",
    sell_price: 1500,
    count: 8,
  },
];

export default function DetailsTable() {
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
        {dummyData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.color}</TableCell>
            <TableCell>{data.count}</TableCell>
            <TableCell>{data.sell_price}</TableCell>
            <TableCell>
              <Button size="sm" color="success">
                Купить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
