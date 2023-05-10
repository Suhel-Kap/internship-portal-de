import Layout from "../components/Layout";
import {Container, Grid, Title} from "@mantine/core";
import {JobCard} from "../components/JobCard";
import {JOB_DATA} from "../constants"
import Head from "next/head";

export default function Jobs() {
    const data = JOB_DATA.map((job) => {
        return (
            <Grid.Col key={job.link} span={3}>
                <JobCard location={job.company} description={`${job.description.slice(0, 250)}...`} title={job.title}
                         link={job.link}/>
            </Grid.Col>
        )
    })
    return (
        <>
            <Head>
                <title>Jobs</title>
            </Head>
            <Layout>
                <Container size={"xl"} py={"xl"}>
                    <Title order={2}>Jobs</Title>
                    <Grid m={"md"} gutter={"md"}>
                        {data}
                    </Grid>
                </Container>
            </Layout>
        </>
    )
}