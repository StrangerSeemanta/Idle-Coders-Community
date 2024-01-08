import { Fragment } from 'react'

import BlogCard from './BlogCard'
import Blogs from '../data/Blogs'

function BlogPage() {

    return (
        <Fragment>

            <div className="max-w-full py-4 gap-4 grid grid-cols-12 grid-rows-3 px-2">

                {Blogs.map((blog, index) => (

                    <Fragment key={`${blog.heading}  ${index}`}>
                        <div className="col-span-12 sm:col-span-3 ">
                            <BlogCard
                                heading={blog.heading}
                                catagory={blog.catagory}
                                thumbnail={blog.thumbnail}

                            />
                        </div>
                    </Fragment>

                ))}

            </div>

            z        </Fragment>
    )
}

export default BlogPage