import { ReactNode } from "react";
interface Props {
    heading: string | ReactNode;
    catagory?: string
    thumbnail: string;


}
function BlogCard({ heading, catagory, thumbnail, }: Props) {
    return (
        <a href="">
            <div className=" group hover:bg-primary-50/60 dark:hover:bg-primary-50/30 transition overflow-hidden rounded-lg p-3  h-full flex flex-col justify-start">
                <div >
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <img src={thumbnail} alt={heading?.toString()} className="object-cover transition group-hover:scale-150 w-full h-full" />
                    </div>
                </div>
                <div className="flex flex-col pt-2 flex-1">
                    <div className="text-lg md:text-base font-medium group-hover:text-primary-700 transition line-clamp-2">
                        {heading}
                    </div>
                    <p className="text-xs text-muted-foreground">Shuvo Sarker</p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <div className="rounded-full flex items-center justify-center bg-foreground-200 dark:bg-foreground-50 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-danger h-4 w-4">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>

                            <span>23 Chapters</span>
                        </div>
                    </div>

                </div>

                <div className="">
                    <p className="text-xs font-medium text-slate-700 my-2">
                        {catagory}
                    </p>
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        Free
                    </p>
                </div>
            </div>
        </a>
    )
}

export default BlogCard