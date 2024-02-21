import { Fragment, } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'


function Resources() {
    return (
        <Fragment>
            <Sidebar>
                <div className=" bg-transparent w-full h-full ">
                    <Outlet />
                </div>
            </Sidebar>
        </Fragment>
    )
}

export default Resources