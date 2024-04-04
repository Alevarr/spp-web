import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import Cookies from "js-cookie";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../components/password-input";
import { Link as ReactRouterDomLink, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api-endpoints";
import { toast } from "sonner";

const signInSchema = z.object({
  username: z.string().min(1, { message: "Поле обязательно к заполнению." }),
  password: z.string().min(1, { message: "Поле обязательно к заполнению." }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.SIGN_IN;
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) return setErrorMessage("Неверный логин или пароль");
      const token = (await res.json()).token;

      const now = new Date();
      now.setMinutes(now.getMinutes() + 3);
      Cookies.set("token", token, { expires: now });
      toast.success("Успешная авторизация");
      navigate("/details");
    } catch (e) {
      setErrorMessage("Ошибка авторизации.");
    }
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
            Войти
          </Button>

          <Link
            id="LINK_sign_up_from_sign_in"
            as={ReactRouterDomLink}
            size="sm"
            to="/sign-up"
            className="justify-self-center"
          >
            Зарегестрироваться
          </Link>
        </div>
      </form>
    </div>
  );
}
