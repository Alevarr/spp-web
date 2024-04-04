import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Switch,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { Sell } from "../tyeps";
import { toast } from "sonner";
import { useState } from "react";

export default function SellsTable() {
  const [isSelected, setIsSelected] = useState(false);
  const { data } = useQuery<Sell[]>({
    queryKey: ["sells"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.SELLS;
      const res = await fetcher(url, {
        method: "GET",
      });
      if (!res.ok) {
        toast.error("Ошибка получения данных");
        return [];
      }
      return await res.json();
    },
    initialData: [],
  });
  const queryClient = useQueryClient();
  return (
    <>
      <div className="flex flex-col gap-2">
        <Switch isSelected={isSelected} onValueChange={setIsSelected}>
          Проверка блокировки
        </Switch>
      </div>
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
          {data.map((sell, index) => (
            <TableRow key={index}>
              <TableCell>{sell.user ? sell.user.username : "Нет"}</TableCell>
              <TableCell>{sell.detail.name}</TableCell>
              <TableCell>{sell.detail.color.name}</TableCell>
              <TableCell>{sell.count}</TableCell>
              <TableCell>{sell.totalPrice}</TableCell>
              <TableCell>
                {sell.paid ? (
                  <Chip size="sm" color="success">
                    Оплачено
                  </Chip>
                ) : (
                  <Chip size="sm" color="warning">
                    Не оплачено
                  </Chip>
                )}
              </TableCell>
              <TableCell className="flex flex-row gap-2">
                <Button
                  size="sm"
                  color="danger"
                  onClick={async () => {
                    const url =
                      import.meta.env.VITE_API_URL +
                      API_ENDPOINTS.DELETE_SELL(sell.id);
                    const res = await fetcher(url, {
                      method: "DELETE",
                    });
                    if (!res.ok) toast.error("Ошибка");
                    toast.success("Успешно");
                    queryClient.invalidateQueries({ queryKey: ["sells"] });
                  }}
                >
                  Удалить
                </Button>
                <Button
                  size="sm"
                  isDisabled={sell.paid}
                  onClick={async () => {
                    const url =
                      import.meta.env.VITE_API_URL +
                      API_ENDPOINTS.SET_IS_PAID(sell.id);

                    if (isSelected) {
                      Promise.all([
                        fetcher(url, {
                          method: "PUT",
                        }),
                        fetcher(url, {
                          method: "PUT",
                        }),
                      ])
                        .then((responses) =>
                          Promise.all(
                            responses.map(
                              async (response) => await response.json()
                            )
                          )
                        )
                        .then((data) => {
                          console.log(data[0]);
                          console.log(data[1]);
                        })
                        .catch((error) => {
                          console.error("Ошибка", error);
                        });
                      // const res1 = fetcher(url, {
                      //   method: "PUT",
                      // });
                      // const res2 = fetcher(url, {
                      //   method: "PUT",
                      // });
                      // console.log(res1, res2);
                    } else {
                      const res = await fetcher(url, {
                        method: "PUT",
                      });
                      if (!res.ok) toast.error("Ошибка");
                      toast.success("Успешно");
                    }

                    queryClient.invalidateQueries({ queryKey: ["sells"] });
                  }}
                >
                  Пометить как оплачено
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
