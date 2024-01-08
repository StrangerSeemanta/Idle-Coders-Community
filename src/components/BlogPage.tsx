import { Fragment } from 'react'

// import BlogCard from './BlogCard'
// import Blogs from '../data/Blogs'

function BlogPage() {

    return (
        <Fragment>

            {/* <div className="max-w-full py-4 gap-4 grid grid-cols-12 grid-rows-3 px-2">

                {Blogs.map((blog, index) => (


                    <BlogCard
                        key={`${blog.heading}  ${index}`}
                        heading={blog.heading}
                        catagory={blog.catagory}
                        thumbnail={blog.thumbnail}

                    />

                ))}

            </div> */}
            <div className="flex flex-col gap-y-5 justify-center items-center h-[80vh] w-full">
                <h1 className='text-4xl font-bold'>
                    This Page Is Coming Very Soon!!!
                </h1>
                <h1 className='text-xl'>
                    Stay Tuned &amp; Stay With <span className='text-danger'>Idle Coders</span>
                </h1>
            </div>
        </Fragment>
    )
}

export default BlogPage