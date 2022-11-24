import Layout from "../components/Layout";
import {Container, Grid, Title} from "@mantine/core";
import {JobCard} from "../components/JobCard";

export default function Jobs(){
    return (
        <Layout>
            <Container>
                <Title order={2}>Jobs</Title>
                <Grid m={"md"} gutter={"md"}>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                    <Grid.Col lg={4}>
                        <JobCard location={"remote"} description={"Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor"} title={"SDE Intern"}  />
                    </Grid.Col>
                </Grid>
            </Container>
        </Layout>
    )
}