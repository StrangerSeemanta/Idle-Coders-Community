import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
interface CustomDivProps {
    disableBorder?: boolean,
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
    nopadding?: boolean;
}
interface DivProps extends HTMLAttributes<HTMLDivElement>, CustomDivProps { }

const Paper = forwardRef<HTMLDivElement, DivProps>(({
    className,
    children,
    disableBorder,
    rounded, nopadding,
    ...props
}, ref) => {

    return (
        <div ref={ref} className={twMerge("dark:bg-default-50 dark:border-divider", !nopadding && "p-6", rounded && `rounded-${rounded}`, !disableBorder && "border", className)} {...props}>
            {children}
        </div>
    )
})
export default Paper