import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalProps, ModalHeaderProps, ModalFooterProps, ModalContentProps, ModalBodyProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalBoxProps {
    isOpen: boolean;
    onOpenChange: () => void;
    header: string | ReactNode;
    children: string | ReactNode;
    footerAction?: string | ReactNode;
    disableCloseButton?: boolean;
    overrides?: {
        modal?: ModalProps,
        header?: ModalHeaderProps,
        footer?: ModalFooterProps,
        content?: ModalContentProps,
        body?: ModalBodyProps;
    }

}
export default function ModalBox({ isOpen, onOpenChange, header, children, footerAction, disableCloseButton, overrides }: ModalBoxProps) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...overrides?.modal}>
                <ModalContent {...overrides?.content}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1" {...overrides?.header}>{header}</ModalHeader>
                            <ModalBody {...overrides?.body}>
                                {children}
                            </ModalBody>
                            <ModalFooter {...overrides?.footer}>
                                {!disableCloseButton &&
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                }
                                {footerAction}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
