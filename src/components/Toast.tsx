import { Button, Card, CardBody } from '@nextui-org/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'
interface Props {
    children: string | ReactNode;
    open: boolean;
    onClose: () => void;
    disableAutohide?: boolean;
}
function Toast({ children, open, onClose, disableAutohide }: Props) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (!disableAutohide) {
            if (open) {
                setShow(true)
                const init = setTimeout(() => {
                    onClose();
                }, 2500)

                return () => clearTimeout(init)
            } else {
                setShow(false)

            }
        }
    }, [open, disableAutohide])
    const cardClass = "w-[400px] min-h-[40px] fixed bottom-2 left-2 bg-danger -translate-x-[600px] transition-all duration-500 ease-soft-spring";
    return (
        <Fragment>
            {disableAutohide ? <Card shadow='lg' radius='sm' className={open ? cardClass.replace("-translate-x-[600px]", "--translate-x-[0px]") : cardClass}>

                <CardBody className='text-sm font-bold text-white justify-between items-center flex flex-row  w-full relative'>
                    <span>{children}</span>

                    <Button onClick={onClose} isIconOnly radius='full' size='sm' variant='solid' color='danger' className='text-sm font-bold text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </Button>
                </CardBody>
            </Card> : <Card shadow='lg' radius='sm' className={show ? cardClass.replace("-translate-x-[600px]", "--translate-x-[0px]") : cardClass}>

                <CardBody className='text-sm font-bold text-white justify-between items-center flex flex-row  w-full relative'>
                    <span>{children}</span>

                    <Button onClick={onClose} isIconOnly radius='full' size='sm' variant='solid' color='danger' className='text-sm font-bold text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </Button>
                </CardBody>
            </Card>}

        </Fragment >
    )
}

export default Toast