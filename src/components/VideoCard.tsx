import { Fragment, ReactNode } from "react"
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Player from "./Player";

interface Props {
    children: string | ReactNode;
    thumbnail: string;
    source: string;

}
function VideoCard({ children, thumbnail, source }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Fragment>
            <Card onPress={onOpen} isPressable isFooterBlurred shadow="md" className="w-full bg-default-100/60 backdrop-blur-sm h-[250px] hover:bg-default-400/40 ">

                <CardBody className="relative w-full h-[250px] overflow-hidden">
                    <Image
                        isZoomed
                        alt={thumbnail}
                        className="z-0  w-full h-full rounded-lg"
                        src={thumbnail}
                    />
                </CardBody>
                <CardFooter className="flex justify-center overflow-hidden ">
                    <p className="text-foreground text-medium font-extrabold">
                        {children}
                    </p>

                </CardFooter>
            </Card>

            <Modal backdrop="blur" isDismissable={false} placement="center" size="xl" className="bg-default-200/60" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{children}</ModalHeader>
                            <ModalBody className="flex justify-center items-center">
                                <Player poster={thumbnail} src={source} ></Player>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" size="sm" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" size="sm" radius="full" endContent={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                    </svg>

                                } onPress={onClose}>
                                    Youtube
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Fragment>
    )
}

export default VideoCard