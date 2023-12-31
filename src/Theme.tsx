import { ReactNode } from "react"

function Theme({ children }: { children: ReactNode }) {
    return (
        <main id="theme_container" aria-label="dark" className="dark text-foreground bg-background">
            {children}

        </main>
    )
}

export default Theme