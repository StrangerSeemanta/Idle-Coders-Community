import { Fragment } from 'react'
import Wave from "./../assets/bg.png"

import Beam from '../components/Beam'
import BlogCard from '../components/BlogCard'
import Blogs from '../data/Blogs'

function BlogPage() {

    return (
        <Fragment>

            <Beam imgSrc={Wave}>
                <div className="max-w-full py-4 gap-2 grid grid-cols-12 grid-rows-3 px-8">

                    {Blogs.map((blog, index) => (

                        <Fragment key={`${blog.heading}  ${index}`}>
                            <div className="col-span-12 sm:col-span-4 ">
                                <BlogCard
                                    heading={blog.heading}
                                    catagory={blog.catagory}
                                    thumbnail={blog.thumbnail}
                                    posted={blog.posted}
                                    description={blog.des}
                                />
                            </div>
                        </Fragment>

                    ))}

                </div>

            </Beam>
        </Fragment>
    )
}

export default BlogPage