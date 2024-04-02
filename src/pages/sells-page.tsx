import SellsTable from "../components/sells-table";
import Title from "../components/title";

export default function SellsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Title>История продаж</Title>
      <SellsTable />
    </div>
  );
}
