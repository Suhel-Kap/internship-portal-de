import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.black,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

interface CardProps {
    image: string;
    title: string;
    category: string;
}

function Card({ image, title, category }: CardProps) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button variant="white" color="dark">
                Read article
            </Button>
        </Paper>
    );
}

const data = [
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/6371f5867decf_second_homepage_banner__1280x500-01.png?d=1266x494',
        title: 'Reliance TUP',
        category: 'competition',
    },
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/6374b8846832a_Cognizant-Rotating-banner-1.jpg?d=1266x494',
        title: 'Cognizant Programmer Analyst Trainee',
        category: 'job',
    },
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/6375cd3ea94af_TomorrowLAB_2022_Banner_1280x500px-01__1_.jpg?d=1266x494',
        title: 'TATA Steel Hackathon',
        category: 'hackathon',
    },
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/6363d51cebf20_Homepage__2_.png?d=1266x494',
        title: 'The CEO Challenge',
        category: 'challenge',
    },
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63788f4c25878_DELPHIQUE_2022_Unstop_Home_Banner__1_.png?d=1266x494',
        title: 'Delphique Management Convention',
        category: 'hackathon',
    },
    {
        image:
            'https://d8it4huxumps7.cloudfront.net/images/home-page-banner/6373320aa6d1e_Rotating.jpg?d=1266x494',
        title: 'Hero Campus Challenge',
        category: 'challenge',
    },
];

export default function CardsCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize="50%"
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}
        </Carousel>
    );
}