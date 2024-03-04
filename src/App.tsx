import { Fragment, useEffect, useState } from "react"
import Router from "./Router"
import Toast from "./components/Toast"
import { Spinner } from "@nextui-org/react";


function App() {
    const [offlineToast, setOfflineToast] = useState(false);
    useEffect(() => {


        const int = setInterval(() => {
            if (!window.navigator.onLine) {
                setOfflineToast(true)

            } else {
                setOfflineToast(false)
            }
        }, 1000)

        return () => clearInterval(int)

    }, [])
    return (
        <Fragment>
            <Router />
            <Toast disableAutohide open={offlineToast} onClose={() => {
                setOfflineToast(false)
            }} >
                <div className="flex justify-start items-center gap-7">
                    <span>Ahha, It seems you are currently offline!</span><Spinner color="current" size="sm" />
                </div>
            </Toast>
        </Fragment>
    )
}

export default App