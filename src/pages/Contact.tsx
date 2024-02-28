import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Input, Switch, Textarea, ScrollShadow, Select, SelectItem, } from "@nextui-org/react";
import CountriesData from "./../data/countries.json"
import Policies from '../components/Policies';
import Beam from '../components/Beam';
import BG from "./../assets/Bg_2.png"
import Footer from '../components/Footer';

function Contact() {
    const [agreed, setAgreed] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedCountry, setSelectedCountry] = useState<string | number>('')

    return (
        <>
            <Beam imgSrc={BG} size='contain'>
                <div className=" relative  isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Get In Touch</h2>
                        <p className="mt-2 text-lg leading-8 text-foreground-400">
                            Just Write Down Your Message, We Will Catch You!!!
                        </p>
                    </div>
                    <form action="#" method="GET" className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Input variant="bordered" isRequired labelPlacement="outside" label="First Name" name="fname" size="md" radius="sm" />
                            </div>
                            <div>
                                <Input variant="bordered" labelPlacement="outside" label="Last Name" name="lname" size="md" radius="sm" />
                            </div>
                            <div className="sm:col-span-2">
                                <Input variant="bordered" labelPlacement="outside" label="Company" name="company" size="md" radius="sm" />

                            </div>
                            <div className="sm:col-span-2">
                                <Input autoComplete="email" type="email" id="email" variant="bordered" labelPlacement="outside" label="Email Id" name="email" isRequired size="md" radius="sm" />

                            </div>
                            <div className="sm:col-span-2 flex justify-center gap-x-2 items-center">
                                <Select name={'country_code'} labelPlacement='outside' className=' w-3/4' items={CountriesData} value={selectedCountry} label="Select Your Country Code" size='md' radius='sm' isRequired variant='bordered'>
                                    {(country) => {
                                        return <SelectItem color='danger' className='text-foreground' key={country.dial_code} onSelect={() => setSelectedCountry(country.dial_code)} textValue={country.dial_code} endContent={country.dial_code} title={`${country.name} (${country.code})`}>{`${country.name} (${country.code})`}</SelectItem>
                                    }}
                                </Select>
                                <Input autoComplete="phone" type="tel" id="phone" variant="bordered" labelPlacement="outside" label="Phone Number" name="phone" isRequired size="md" radius="sm" />

                            </div>
                            <div className="sm:col-span-2">
                                <Textarea name='message' maxRows={6} minRows={4} label="Message" labelPlacement="outside" placeholder="Write Your Message" isRequired variant="bordered" />
                            </div>
                            <div className="flex items-center w-full flex-wrap  gap-x-1 sm:col-span-2">
                                <Switch color='danger' isSelected={agreed} onValueChange={() => { agreed ? setAgreed(!agreed) : onOpen() }} size="sm" >By selecting this, you agree to our
                                </Switch>
                                <Button disableRipple onPress={onOpen} variant='bordered' className="p-0 hover:underline hover:border-transparent border-transparent font-semibold text-primary">
                                    Terms&nbsp;&&nbsp;Conditions
                                </Button>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Button type='submit' isDisabled={!agreed} fullWidth radius='sm' color={agreed ? 'danger' : "default"} variant={agreed ? 'shadow' : "solid"}>Submit</Button>
                        </div>
                    </form >
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' backdrop='blur' placement='bottom-center' size='md'>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Terms & Conditions</ModalHeader>
                                    <ModalBody>
                                        <ScrollShadow hideScrollBar size={60}>
                                            <Policies />
                                        </ScrollShadow>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" radius='sm' variant="shadow" onPress={() => { setAgreed(true); onClose() }}>
                                            Accept
                                        </Button>

                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div >
            </Beam>

            {/* Add Footer */}
            <Footer />
        </>
    )
}
export default Contact;