import { Spinner, SpinnerProps } from '@nextui-org/react'
import React from 'react'

const PageLoader = React.forwardRef<HTMLDivElement | null, SpinnerProps>(({ ...props }, ref) => {
    return (
        <Spinner
            ref={ref}
            classNames={{
                base: "w-56 h-56",
                wrapper: "h-28 w-28",

            }}
            {...props}
            size="lg"
            color="success"
        />
    )
})

export default PageLoader