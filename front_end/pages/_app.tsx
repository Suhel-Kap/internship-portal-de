import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications'

export default function App({Component, pageProps}: AppProps) {
    return (<>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
                <Component {...pageProps} />
            </NotificationsProvider>
        </MantineProvider>
    </>)
}