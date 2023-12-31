import { BreadcrumbItem, Breadcrumbs, } from '@nextui-org/react'
import { Fragment } from 'react'
import Bg from "./../assets/bg_3.png"
import Caurasol, { CaurasolItem } from '../components/Caurasol';
import Beam from '../components/Beam';
import VideoCard from '../components/VideoCard';
import videoLists from '../contents/VideoLists';

function VideoPage() {

    return (
        <Fragment>
            <Beam imgSrc={Bg} fixed>
                <div className=" p-5  ">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/home">Idle Coders</BreadcrumbItem>
                        <BreadcrumbItem href="/resources">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem href="/resources/videos">Videos</BreadcrumbItem>

                    </Breadcrumbs>
                </div>

                <section className='w-full min-h-[100vh] px-5 py-2 relative '>
                    <h1 className='text-danger text-2xl font-bold px-5'>Latest Videos</h1>

                    <Caurasol disableSlide>
                        {videoLists.map((data, index) => (
                            <CaurasolItem key={data.title + String(index)} width='23rem'>
                                <VideoCard source={data.src} thumbnail={data.thumbnail}>
                                    {data.title}
                                </VideoCard>
                            </CaurasolItem>
                        ))}

                    </Caurasol>
                </section>
            </Beam>

        </Fragment >
    )
}

export default VideoPage