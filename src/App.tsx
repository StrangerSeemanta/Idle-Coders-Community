import { Fragment, useEffect, useState } from "react"
import Router from "./Router"
import Toast from "./components/Toast"


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
                Ahha, It seems you are currently offline!
            </Toast>
        </Fragment>
    )
}

export default App