import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    Title,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
} from "@tabler/icons";
import {useEffect, useState} from "react";
import {isLoggedIn} from "../utils/isLoggedIn";
import {logout} from "../utils/logout";
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1]
        }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("md")]: {
            display: "none",
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: "Open source",
        description: "This Pokémon’s cry is very loud and distracting",
    },
    {
        icon: IconCoin,
        title: "Free for everyone",
        description: "The fluid of Smeargle’s tail secretions changes",
    },
    {
        icon: IconBook,
        title: "Documentation",
        description: "Yanma is capable of seeing 360 degrees without",
    },
    {
        icon: IconFingerprint,
        title: "Security",
        description: "The shell’s rounded shape and the grooves on its.",
    },
    {
        icon: IconChartPie3,
        title: "Analytics",
        description: "This Pokémon uses its flying ability to quickly chase",
    },
    {
        icon: IconNotification,
        title: "Notifications",
        description: "Combusken battles with the intensely hot flames it spews",
    },
];

export default function HeaderSimple() {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] =
        useDisclosure(false);
    const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
    const [logged, setLogged] = useState(false);
    const {classes, theme} = useStyles();
    const router = useRouter();

    useEffect(() => {
        isLoggedIn().then((res) => setLogged(res));
    }, [logged]);

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()}/>
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box>
            <Header height={90} px="md">
                <Group position="apart" sx={{height: "100%"}}>
                    <a href="/" className={classes.link}>
                        <Title order={3}>Career Readiness Portal</Title>
                    </a>

                    <Group
                        sx={{height: "100%"}}
                        spacing={0}
                        className={classes.hiddenMobile}
                    >
                        <a href="/jobs" className={classes.link}>
                            Jobs
                        </a>
                        <a href="/knowledge-center" className={classes.link}>
                            Knowledge Centre
                        </a>
                        <a href="/interview-prep" className={classes.link}>
                            Interview Preparation
                        </a>
                        <a
                            href={logged ? "/resume-builder" : "/login"}
                            className={classes.link}
                        >
                            Resume Builder
                        </a>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        {!logged && (
                            <>
                                <Button
                                    component={"a"}
                                    href={"/login"}
                                    variant="default"
                                >
                                    Log in
                                </Button>
                                <Button component={"a"} href={"/register"}>
                                    Sign up
                                </Button>
                            </>
                        )}
                        {logged && (
                            <>
                                {/*<Button component={"a"} href={"/dashboard"} variant="default">Dashboard</Button>*/}
                                <Button
                                    onClick={async () => await logout(router)}
                                >
                                    Log out
                                </Button>
                            </>
                        )}
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                    />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{height: "calc(100vh - 60px)"}} mx="-md">
                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <a href="/jobs" className={classes.link}>
                        Jobs
                    </a>
                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Knowledge Centre
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="/interview-prep" className={classes.link}>
                        Interview Preparation
                    </a>
                    <a href="/resume-builder" className={classes.link}>
                        Resume Builder
                    </a>

                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <Group position="center" grow pb="xl" px="md">
                        {!logged && (
                            <>
                                <Button
                                    component={"a"}
                                    href={"/login"}
                                    variant="default"
                                >
                                    Log in
                                </Button>
                                <Button component={"a"} href={"/register"}>
                                    Sign up
                                </Button>
                            </>
                        )}
                        {logged && (
                            <>
                                {/*<Button component={"a"} href={"/dashboard"} variant="default">Dashboard</Button>*/}
                                <Button
                                    onClick={async () => await logout(router)}
                                >
                                    Log out
                                </Button>
                            </>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
