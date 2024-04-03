import {
  ModalBody,
  Input,
  Select,
  SelectItem,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RussianRuble } from "lucide-react";
import { colors } from "../pages/purchases-page";
import { z } from "zod";
// import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addNewDetailSchema = z.object({
  name: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  color_id: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  count: z.number().min(1, { message: "Поле обязательно к заполнению." }),
  total_price: z.number().min(1, { message: "Поле обязательно к заполнению." }),
});

type AddNewDetailSchemaType = z.infer<typeof addNewDetailSchema>;

export default function AddNewDetailForm({ onClose }: { onClose: () => void }) {
  //   const [isSubmitting, startSubmitting] = useTransition();

  //   const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddNewDetailSchemaType>({
    resolver: zodResolver(addNewDetailSchema),
  });
  const onSubmit: SubmitHandler<AddNewDetailSchemaType> = (data) => {
    console.log(data);
    // startSubmitting(async () => {
    //   try {
    //     await signInUser(
    //       { email: data.username, password: data.password },
    //       searchParams.get("callbackUrl")
    //     );
    //   } catch (error) {
    //     setErrorMessage(t("errors.unknown"));
    //   }
    // });
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
        <Button color="primary" type="submit">
          Готово
        </Button>
      </ModalFooter>
    </form>
  );
}
