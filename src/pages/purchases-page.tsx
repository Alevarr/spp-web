import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import PurchasesTable from "../components/purchases-table";
import Title from "../components/title";
import { Plus } from "lucide-react";
import { RussianRuble } from "lucide-react";

const colors = [
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

const details = [
  {
    id: "1",
    name: "Дверь",
  },
  {
    id: "2",
    name: "Стул",
  },
  {
    id: "3",
    name: "Шкаф",
  },
  {
    id: "4",
    name: "Резиновая пизда",
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
                  Добавить запись о заккупке
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Название"
                    placeholder="Название детали"
                    variant="bordered"
                  />
                  <Select
                    items={colors}
                    label="Цвет"
                    placeholder="Цвет детали"
                    className=""
                  >
                    {(color) => (
                      <SelectItem key={color.id}>{color.name}</SelectItem>
                    )}
                  </Select>
                  <Select
                    items={details}
                    label="Деталь"
                    placeholder="Название детали"
                    className=""
                  >
                    {(detail) => (
                      <SelectItem key={detail.id}>{detail.name}</SelectItem>
                    )}
                  </Select>
                  <Input placeholder="Новая деталь" variant="bordered" />
                  <Input
                    endContent={
                      <RussianRuble className="text-foreground-400" />
                    }
                    label="Стоимость"
                    placeholder="1200"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Закрыть
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Готово
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
