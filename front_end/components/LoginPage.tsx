import {Anchor, Button, Checkbox, createStyles, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {setCookie} from "cookies-next";
import {useInputState} from "@mantine/hooks";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: "100vh",
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        height: "100vh",
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function LoginPage() {
    const {classes} = useStyles();
    const [email, setEmail] = useInputState('');
    const [password, setPassword] = useInputState('');
    const router = useRouter();

    const login = async () => {
        if (email === "" || password === "") {
            alert("Please fill out all fields");
            return;
        }
        const response = await fetch("http://localhost:4000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const resJson = (await response.json())
        console.log(resJson)
        if (resJson.status === "success") {
            const token = resJson.token
            setCookie('crp_login_token', token, {path: '/'})
            setCookie('email', email, {path: '/'})
            showNotification({
                title: 'Login Successful',
                message: 'You have successfully logged in',
            })
            await router.push('/')
        }

        if (resJson.status === "error") {
            showNotification({
                title: 'Error',
                message: 'An error occurred while logging in. Make sure you have entered the correct credentials.',
                color: "red",
            })
        }

    }
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome back!
                </Title>

                <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={email}
                           onChange={setEmail} required/>
                <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password}
                               onChange={setPassword} required/>
                <Checkbox label="Keep me logged in" mt="xl" size="md"/>
                <Button fullWidth mt="xl" size="md" onClick={async () => await login()}>
                    Login
                </Button>

                <Text align="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Anchor href="/register" weight={700}>
                        Register
                    </Anchor>
                </Text>
                <Text align="center" mt="md">
                    <Anchor href="/" weight={700}>
                        Go to home page
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
}