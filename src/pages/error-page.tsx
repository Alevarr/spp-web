import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Title from "../components/title";
import Subtitle from "../components/subtitle";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      {/* <NavBar /> */}
      <div className="p-6">
        <Title>Что-то пошло не так</Title>
        <Subtitle>
          {isRouteErrorResponse(error)
            ? "Страница не найдена"
            : "Неизвестная ошибка"}
        </Subtitle>
      </div>
    </>
  );
};

export default ErrorPage;
