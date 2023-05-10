import Layout from "../components/Layout";
import {Container, Paper, Title} from "@mantine/core";
import Head from "next/head";
import {PROGRAMMING_LANGUAGES} from "../constants";
import Link from "next/link";

export default function KnowledgeCenter() {
    return (
        <>
            <Head>
                <title>Knowledge Centre</title>
            </Head>
            <Layout>
                <Container>
                    <Title order={2} mb={"md"}>Knowledge Centre</Title>
                    {PROGRAMMING_LANGUAGES.map((language, index) => (
                        <Paper key={index} p={"md"} my={"md"}>
                            <Title order={3}>{language.title}</Title>
                            <p>{language.body}...<Link style={{color: "blue", textDecoration: "underline"}} href={language.link} target={"_blank"}>Full article</Link></p>
                        </Paper>
                    ))}
                </Container>
            </Layout>
        </>
    )
}