import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
function Nopage() {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <main className="grid min-h-[90vh] place-items-center  px-6 py-24 sm:py-32 lg:px-8" >
                <div className="text-center">
                    <p className="text-base font-semibold text-primary-400">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground-900 sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-foreground-400">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button
                            color='default'
                            variant='ghost'
                            onClick={() => { navigate(-1) }}
                            radius='sm'
                        >
                            Go back
                        </Button>
                        <Button
                            variant='light'
                            color='default'
                            radius='full'
                            onClick={() => { navigate("/home") }}
                            endContent={<span >&rarr;</span>} >
                            Home
                        </Button>
                    </div>
                </div>
            </main>

        </React.Fragment>
    )
}

export default Nopage