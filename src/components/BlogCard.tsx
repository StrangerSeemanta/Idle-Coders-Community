import { Avatar, Card, CardFooter, Divider, Image, Spacer, } from "@nextui-org/react"
import { ReactNode } from "react";
interface Props {
    heading: string | ReactNode;
    catagory?: string
    thumbnail: string;
    posted?: {
        by: string;
        date: string;
        profileImgSrc?: string;
    }
    footerAction?: ReactNode;
    description?: string | ReactNode;
}
function BlogCard({ heading, catagory, thumbnail, posted, description, footerAction }: Props) {
    return (
        <Card isPressable isFooterBlurred isHoverable shadow='lg' className="w-full min-h-[300px]  ring-1 ring-foreground-400/40 hover:brightness-90 dark:hover:brightness-125  ">


            <Image
                radius="none"
                isZoomed
                alt={`Can't Load The Thumbnail Image`}
                className="z-0 w-full object-cover"
                src={thumbnail}
            />
            <CardFooter className=" bg-background dark:bg-default flex-col items-start">
                <div className=" flex-col items-start">
                    <p className="text-tiny text-left text-warning uppercase font-bold">{catagory}</p>
                    <Spacer y={2} />

                    <div className="flex flex-grow gap-2 flex-col  items-start lg:flex-row lg:items-center">

                        <div className="text-foreground font-bold text-left text-medium">{heading}</div>


                    </div>


                </div>
                <Spacer y={2} />
                <div className="flex flex-grow gap-2 items-center">


                    <div className="text-tiny text-left text-foreground/60">{description}</div>

                    {footerAction && footerAction}
                </div>
                <Divider className="my-2" />

                <div className="w-full flex justify-between items-center">

                    <div className="flex flex-col justify-start items-start">
                        <h5 className="text-xs capitalize">{posted?.by}</h5>
                        <h5 className="text-[0.5rem] text-left">{posted?.date}</h5>

                    </div>

                    <Avatar size="sm" color="danger" name={!posted?.profileImgSrc ? posted?.by : ""} src={posted?.profileImgSrc && posted.profileImgSrc} />
                </div>
            </CardFooter>
        </Card>)
}

export default BlogCard