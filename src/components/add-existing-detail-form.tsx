import {
  ModalBody,
  Input,
  Select,
  SelectItem,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RussianRuble } from "lucide-react";
import { details } from "../pages/purchases-page";
// import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const addExistingDetailSchema = z.object({
  detail_id: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  count: z.number().min(1, { message: "Поле обязательно к заполнению." }),
  total_price: z.number().min(1, { message: "Поле обязательно к заполнению." }),
});

type AddExistingDetailSchemaType = z.infer<typeof addExistingDetailSchema>;

export default function AddExistingDetailForm({
  onClose,
}: {
  onClose: () => void;
}) {
  //   const [isSubmitting, startSubmitting] = useTransition();

  //   const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddExistingDetailSchemaType>({
    resolver: zodResolver(addExistingDetailSchema),
  });
  const onSubmit: SubmitHandler<AddExistingDetailSchemaType> = (data) => {
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
        <Select
          autoFocus
          isRequired
          items={details}
          label="Деталь"
          placeholder="Название детали"
          {...register("detail_id")}
        >
          {(detail) => (
            <SelectItem key={detail.id}>
              {detail.name + " " + detail.color}
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
