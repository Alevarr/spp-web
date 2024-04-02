import DetailsTable from "../components/details-table";
import Title from "../components/title";

export default function DetailsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Title>Каталог деталей</Title>
      <DetailsTable />
    </div>
  );
}
