import { useNavigate } from "react-router-dom";
import useUser from "../components/hooks/useUser";
import SellsTable from "../components/sells-table";
import Title from "../components/title";

export default function SellsPage() {
  const user = useUser();
  const navigate = useNavigate();
  const isAdmin = user ? user?.roles.includes("ROLE_ADMIN") : false;
  if (!isAdmin) navigate("/details");

  return (
    <div className="flex flex-col gap-4">
      <Title>История продаж</Title>
      <SellsTable />
    </div>
  );
}
