import Layout from "../components/Layout";
import Head from "next/head";
import {Container, Paper, Title} from "@mantine/core";
import Link from "next/link";
import {INTERVIEW_EXPERIENCES} from "../constants";

export default function InterviewPrep(){
    return (
        <>
            <Head>
                <title>Interview Preparation</title>
            </Head>
            <Layout>
                <Container>
                    <Title order={2} mb={"md"}>Interview Preparation</Title>
                    {INTERVIEW_EXPERIENCES.map((interview, index) => (
                        <Paper key={index} p={"md"} my={"md"}>
                            <Title order={3}>{interview.title}</Title>
                            <p>{interview.body}...<Link style={{color: "blue", textDecoration: "underline"}} href={interview.link} target={"_blank"}>Full article</Link></p>
                        </Paper>
                    ))}
                </Container>
            </Layout>
        </>
    )
}