import {
    Paper,
    createStyles,
    TextInput,
    Button,
    Title,
    Anchor, Box, Progress, PasswordInput, Group, Text, Center
} from '@mantine/core';
import {getCookie, setCookie} from "cookies-next"
import {useInputState} from '@mantine/hooks';
import {IconCheck, IconX} from '@tabler/icons';
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

function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
        <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size={14} stroke={1.5}/> : <IconX size={14} stroke={1.5}/>}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

function getStrength(password: string) {
    let multiplier = password.length > 8 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const requirements = [
    {re: /[0-9]/, label: 'Includes number'},
    {re: /[a-z]/, label: 'Includes lowercase letter'},
    {re: /[A-Z]/, label: 'Includes uppercase letter'},
    {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'},
];

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


export default function Registration() {
    const {classes} = useStyles();
    const [fname, setFname] = useInputState('');
    const [lname, setLname] = useInputState('');
    const [email, setEmail] = useInputState('');
    const [password, setPassword] = useInputState('');
    const [confirmPassword, setConfirmPassword] = useInputState('');
    const strength = getStrength(password);
    const router = useRouter();
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)}/>
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{bar: {transitionDuration: '0ms'}}}
                value={
                    password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));

    const register = async () => {
        if(fname === "" || lname === "" || email === "" || password === "" || confirmPassword === ""){
            alert("Please fill all fields")
            return
        }
        if(!validateEmail(email)){
            alert("Please enter a valid email")
            return
        }
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        try{
            const response = await fetch("http://localhost:4000/api/v1/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
                },
                body: JSON.stringify({
                    "firstname": fname,
                    "lastname": lname,
                    "email": email,
                    "password": password,
                    "passwordConfirm": confirmPassword
                })
            })
            const resJson = (await response.json())
            // store token in cookies
            const token = resJson.token
            setCookie('crp_login_token', token, {path: '/'})
            setCookie('email', email, {path: '/'})
    
    
            await router.push('/')
        } catch (e){
            alert("Error signing up")
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md">
                    Welcome!
                </Title>

                <TextInput label="First Name" placeholder="First Name" size="md" mt="md" required value={fname}
                           onChange={setFname}/>
                <TextInput label="Last Name" placeholder="Last Name" size="md" mt="md" required value={lname}
                           onChange={setLname}/>
                <TextInput label="Email address" placeholder="hello@gmail.com" size="md" required value={email}
                           onChange={setEmail}/>
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Your password"
                    label="Password"
                    required
                    mt={"md"}
                    size={"md"}
                />

                <Group spacing={5} grow mt="xs" mb="md">
                    {bars}
                </Group>

                <PasswordRequirement label="Has at least 8 characters" meets={password.length > 8}/>
                {checks}
                <PasswordInput label="Confirm Password" placeholder="Re-enter your password" mt="md" size="md" required
                               value={confirmPassword} onChange={setConfirmPassword}/>
                <Button fullWidth mt="xl" size="md" onClick={async () => {
                    await register()
                }}>
                    Register
                </Button>
                <Text align="center" mt="xs">
                    <Anchor href="/" weight={700}>
                        Go to home page
                    </Anchor>
                </Text>

            </Paper>
        </div>
    );
}