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
import useUser from "../components/hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function PurchasesPage() {
  const user = useUser();
  const navigate = useNavigate();
  const isAdmin = user ? user?.roles.includes("ROLE_ADMIN") : false;
  if (!isAdmin) navigate("/details");

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
