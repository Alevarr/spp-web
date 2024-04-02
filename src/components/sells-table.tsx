import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";

const dummyData = [
  {
    user: "aboba@gmail.com",
    isPaid: false,
    name: "Дверь",
    color: "Красный",
    total_price: 1200,
    count: 17,
  },
  {
    user: "aboba@gmail.com",
    isPaid: false,
    name: "Окно",
    color: "Синий",
    total_price: 800,
    count: 5,
  },
  {
    user: "aboba@gmail.com",
    isPaid: true,
    name: "Стол",
    color: "Белый",
    total_price: 500,
    count: 10,
  },
  {
    user: "aboba@gmail.com",
    isPaid: false,
    name: "Кухня",
    color: "Черный",
    total_price: 2000,
    count: 3,
  },
  {
    user: "aboba@gmail.com",
    isPaid: true,
    name: "Шкаф",
    color: "Зеленый",
    total_price: 1500,
    count: 8,
  },
];

export default function SellsTable() {
  return (
    <Table aria-label="Details table">
      <TableHeader className="font-bold">
        <TableColumn className="font-bold">ПОКУПАТЕЛЬ</TableColumn>
        <TableColumn className="font-bold">НАЗВАНИЕ</TableColumn>
        <TableColumn className="font-bold">ЦВЕТ</TableColumn>
        <TableColumn className="font-bold">КОЛИЧЕСТВО</TableColumn>
        <TableColumn className="font-bold">ЦЕНА</TableColumn>
        <TableColumn className="font-bold">СТАТУС</TableColumn>
        <TableColumn className="font-bold">ДЕЙСТВИЯ</TableColumn>
      </TableHeader>
      <TableBody>
        {dummyData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.user}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.color}</TableCell>
            <TableCell>{data.count}</TableCell>
            <TableCell>{data.total_price}</TableCell>
            <TableCell>
              {data.isPaid ? (
                <Chip size="sm" color="success">
                  Оплачено
                </Chip>
              ) : (
                <Chip size="sm" color="warning">
                  Не оплачено
                </Chip>
              )}
            </TableCell>
            <TableCell>
              <Button size="sm" color="danger">
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
