import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../components/password-input";
import { Link as ReactRouterDomLink } from "react-router-dom";

const signUpSchema = z.object({
  username: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  password: z.string().min(1, { message: "Поле обязательно к заполнению." }),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  // const [isSubmitting, startSubmitting] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
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
    <div className="flex flex-col gap-4 pt-8 items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 min-w-96">
          <Input
            autoFocus
            isRequired
            label="Логин"
            variant="bordered"
            errorMessage={errors.username?.message}
            {...register("username")}
          />

          <PasswordInput
            isRequired
            label="Пароль"
            variant="bordered"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}

          <Button
            id="BTN_sign_in"
            type="submit"
            color="primary"
            // isLoading={isSubmitting}
          >
            Зарегестрироваться
          </Button>

          <Link
            id="LINK_sign_up_from_sign_in"
            as={ReactRouterDomLink}
            size="sm"
            to="/sign-up"
            className="justify-self-center"
          >
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
