import { Image } from "@nextui-org/react";
import { ReactNode } from "react";
interface Props {
    heading: string | ReactNode;
    catagory?: string
    thumbnail: string;


}
function BlogCard({ heading, catagory, thumbnail, }: Props) {
    return (
        <div className="col-span-12 sm:col-span-6 ">
            <a href="">
                <div className=" group shadow-xl dark:bg-default-200/70 hover:shadow-none hover:bg-primary-50/60 dark:hover:bg-primary-50/30 transition overflow-hidden rounded-lg p-3  h-full flex flex-col justify-start">
                    <div >
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                            <Image radius="sm" src={thumbnail} alt={heading?.toString()} className="object-cover transition  w-full h-full" />
                        </div>
                    </div>
                    <div className="flex flex-col pt-2 flex-1">
                        <div className="text-lg text-foreground md:text-xl font-medium group-hover:text-primary-700 transition line-clamp-2">
                            {heading}
                        </div>



                    </div>

                    <div className="">
                        <p className="text-xs font-medium my-2">
                            {catagory}
                        </p>

                    </div>
                </div>
            </a>
        </div>
    )
}

export default BlogCard