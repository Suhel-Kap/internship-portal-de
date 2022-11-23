import {AppShell, Footer} from "@mantine/core";
import {ReactNode} from "react";
import HeaderSimple from "./HeaderSimple";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function Layout({children}: Props) {
    return (
        <AppShell
            padding="md"
            header={<HeaderSimple />}
            footer={<Footer height={60} p={"md"}> All rights reserved. </Footer>}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    )
}