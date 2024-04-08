import {
  ModalBody,
  Input,
  Select,
  SelectItem,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RussianRuble } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { toast } from "sonner";
import { Color } from "../tyeps";

const addNewDetailSchema = z.object({
  name: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  color_id: z.string().min(1, { message: "Поле обязательно к заполнению." }),
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

type AddNewDetailSchemaType = z.infer<typeof addNewDetailSchema>;

export default function AddNewDetailForm({ onClose }: { onClose: () => void }) {
  //   const [errorMessage, setErrorMessage] = useState<string>();
  const queryClient = useQueryClient();

  const { data: colors, isLoading } = useQuery<Color[]>({
    queryKey: ["colors"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.COLORS;
      const res = await fetcher(url, {
        method: "GET",
      });
      if (!res.ok) toast.error("Ошибка при получении доступных цветов.");
      return await res.json();
    },
    initialData: [],
  });
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddNewDetailSchemaType>({
    resolver: zodResolver(addNewDetailSchema),
    defaultValues: {
      count: 0,
      total_price: 0,
    },
  });
  const onSubmit: SubmitHandler<AddNewDetailSchemaType> = async (data) => {
    const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.ADD_NEW_DETAIL;
    const res = await fetcher(url, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        color: {
          ...colors.find((color) => color.id === Number(data.color_id)),
        },
        sellPrice: Math.floor(data.total_price / data.count),
        count: data.count,
      }),
    });

    if (!res.ok) toast.error("Ошибка");
    const detail = await res.json();
    const purchaseUrl =
      import.meta.env.VITE_API_URL + API_ENDPOINTS.ADD_PURCHASE;

    const resPurchase = await fetcher(purchaseUrl, {
      method: "POST",
      body: JSON.stringify({
        detail: { ...detail },
        totalPrice: Math.floor(data.total_price / data.count),
        count: data.count,
      }),
    });
    onClose();
    if (!resPurchase.ok) return toast.error("Ошибка");
    toast.success("Успешно");
    queryClient.invalidateQueries({ queryKey: ["purchases"] });
    queryClient.invalidateQueries({ queryKey: ["details"] });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <Input
          isRequired
          autoFocus
          label="Название"
          placeholder="Название детали"
          variant="bordered"
          {...register("name")}
        />
        <Select
          isRequired
          items={colors}
          isLoading={isLoading}
          label="Цвет"
          placeholder="Цвет детали"
          {...register("color_id")}
        >
          {(color) => <SelectItem key={color.id}>{color.name}</SelectItem>}
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
        <Button id="submitnewdetail" color="primary" type="submit">
          Готово
        </Button>
      </ModalFooter>
    </form>
  );
}
