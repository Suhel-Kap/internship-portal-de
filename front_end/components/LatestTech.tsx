import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons';

const mockdata = [
    {
        title: 'Blockchain',
        description:
            "Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.",
        icon: IconGauge,
    },
    {
        title: 'FAANG',
        description:
            'Augmented reality (AR) and Virtual Reality (VR) bridge the digital and physical worlds. They allow you to take in information and content visually, in the same way you take in the world. AR dramatically expands the ways our devices can help with everyday activities like searching for information, shopping, and expressing yourself. VR lets you experience what it\'s like to go anywhere — from the front row of a concert to distant planets in outer space.',
        icon: IconUser,
    },
    {
        title: 'AR/VR',
        description:
            'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute id est laborum.',
        icon: IconCookie,
    },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
        },
    },
}));

export default function LatestTech() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
            <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
            <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text size="sm" color="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));
    return (
        <Container size="lg" py="xl">

            <Title order={2} className={classes.title} align="center" mt="sm">
                Latest News In Tech
            </Title>

            <Text color="dimmed" className={classes.description} align="center" mt="md">
                Catch up on the latest news in tech, from the latest gadgets to the hottest startups.
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
        </Container>
    );
}