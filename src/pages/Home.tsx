import React from 'react'
import Intro from '../components/Intro'
import LoopBg from "./../assets/LoopBG.svg"
import Footer from '../components/Footer'

function Home() {
    return (
        <React.Fragment>
            <main className='bg-contain lg:bg-cover' style={{ background: `url(${LoopBg})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat" }}>
                <Intro />
                <Footer />
            </main>
        </React.Fragment>
    )
}

export default Home