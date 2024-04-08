import {
  ModalBody,
  Input,
  Select,
  SelectItem,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RussianRuble } from "lucide-react";
// import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { Detail } from "../tyeps";
import { fetcher } from "../utils/fetcher";
import { toast } from "sonner";

const addExistingDetailSchema = z.object({
  detail_id: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  count: z
    .string()
    .transform(Number)
    .refine((value) => !isNaN(value), {
      message: "Поле должно быть числом.",
    }),
  total_price: z
    .string()
    .transform(Number)
    .refine((value) => !isNaN(value), {
      message: "Поле должно быть числом.",
    }),
});

type AddExistingDetailSchemaType = z.infer<typeof addExistingDetailSchema>;

export default function AddExistingDetailForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  //   const [errorMessage, setErrorMessage] = useState<string>();
  const { data: details } = useQuery<Detail[]>({
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

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddExistingDetailSchemaType>({
    resolver: zodResolver(addExistingDetailSchema),
  });
  const onSubmit: SubmitHandler<AddExistingDetailSchemaType> = async (data) => {
    const purchaseUrl =
      import.meta.env.VITE_API_URL + API_ENDPOINTS.ADD_PURCHASE;

    const resPurchase = await fetcher(purchaseUrl, {
      method: "POST",
      body: JSON.stringify({
        detail: { ...details.find((d) => d.id === Number(data.detail_id)) },
        totalPrice: Math.floor(data.total_price / data.count),
        count: data.count,
      }),
    });
    onClose();
    if (!resPurchase.ok) return toast.error("Ошибка");
    toast.success("Успешно");
    queryClient.invalidateQueries({ queryKey: ["purchases"] });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <Select
          autoFocus
          isRequired
          items={details}
          label="Деталь"
          placeholder="Название и цвет детали"
          {...register("detail_id")}
        >
          {(detail) => (
            <SelectItem key={detail.id}>
              {detail.name + " " + (detail.color ? detail.color.name : "")}
            </SelectItem>
          )}
        </Select>

        <Input
          isRequired
          type="number"
          label="Количество"
          placeholder="В штуках"
          variant="bordered"
          {...register("count")}
        />
        <Input
          isRequired
          type="number"
          endContent={<RussianRuble className="text-foreground-400" />}
          label="Стоимость"
          placeholder="1200"
          variant="bordered"
          {...register("total_price")}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Закрыть
        </Button>
        <Button color="primary" type="submit">
          Готово
        </Button>
      </ModalFooter>
    </form>
  );
}
