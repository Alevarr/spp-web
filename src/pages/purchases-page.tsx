import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import PurchasesTable from "../components/purchases-table";
import Title from "../components/title";
import { Plus } from "lucide-react";
import AddExistingDetailForm from "../components/add-existing-detail-form";
import AddNewDetailForm from "../components/add-new-detail-form";

export const colors = [
  {
    id: "1",
    name: "Красный",
  },
  {
    id: "2",
    name: "Синий",
  },
  {
    id: "3",
    name: "Черный",
  },
  {
    id: "4",
    name: "Черный с изумрудно-зеленым отливом",
  },
];

export const details = [
  {
    id: "1",
    name: "Дверь",
    color: "Красный",
  },
  {
    id: "2",
    name: "Стул",
    color: "Красный",
  },
  {
    id: "3",
    name: "Шкаф",
    color: "Черный",
  },
  {
    id: "4",
    name: "Резиновая пизда",
    color: "Синий",
  },
];

export default function PurchasesPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4">
      <Title>История закупок</Title>
      <PurchasesTable />
      <div className="flex flex-row justify-end">
        <Button startContent={<Plus />} color="primary" onClick={onOpen}>
          Добавить
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          className="dark text-foreground bg-background"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Добавить запись о закупке
                </ModalHeader>
                <Tabs aria-label="Options" className="px-6">
                  <Tab key="existing" title="Существующая позиция">
                    <AddExistingDetailForm onClose={onClose} />
                  </Tab>
                  <Tab key="new" title="Новая позиция">
                    <AddNewDetailForm onClose={onClose} />
                  </Tab>
                </Tabs>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}