import Layout from "../components/Layout";
import {Checkbox, Container, Grid, Title} from "@mantine/core";
import {JobCard} from "../components/JobCard";
import {JOB_DATA} from "../constants";
import Head from "next/head";
import {useEffect, useState} from "react";
import {isLoggedIn} from "../utils/isLoggedIn";
import {getCookie} from "cookies-next";
import {showNotification} from "@mantine/notifications";

export default function Jobs() {
  const [logged, setLogged] = useState(false);
  const [customJobs, setCustomJobs] = useState(false);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    isLoggedIn().then((res) => {
      setLogged(res);
    });
  }, [logged]);

  useEffect(() => {
    if (customJobs) getSkills();
  }, [customJobs]);

  const getSkills = async () => {
    const email = getCookie("email");
    // fetch by passing token
    const res = await fetch("http://localhost:4000/addDetail/" + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
            "Content-Type, Authorization, Content-Length, X-Requested-With",
      },
    });
    try {
      const data = await res.json();
      console.log(data);

      const skills = data.skill.map((skill: any) => skill.name);
      console.log(skills);
      setUserSkills(skills);
    } catch (e) {
      showNotification({
        title: 'Error',
        message: 'Make sure you have created your resume first',
        color: "red",
      })
      console.log(e)
    }

  };
  const filteredJobs = customJobs
    ? JOB_DATA.filter((job) =>
        userSkills.some((skill) =>
          job.description.toLowerCase().includes(skill.toLowerCase())
        )
      )
    : JOB_DATA;
  const sortedJobs = customJobs
    ? filteredJobs.sort(
        (a, b) =>
          b.description
            .toLowerCase()
            .split(" ")
            .filter((skill) => userSkills.includes(skill)).length -
          a.description
            .toLowerCase()
            .split(" ")
            .filter((skill) => userSkills.includes(skill)).length
      )
    : filteredJobs;

  const data = sortedJobs.map((job) => {
    return (
      <Grid.Col key={job.link} span={3}>
        <JobCard
          location={job.company}
          description={`${job.description.slice(0, 250)}...`}
          title={job.title}
          link={job.link}
        />
      </Grid.Col>
    );
  });
  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <Layout>
        <Container size={"xl"} py={"xl"}>
          <Title order={2}>Jobs</Title>
          {logged && (
            <Checkbox
              label={"Show only jobs that match my skills"}
              checked={customJobs}
              onChange={() => setCustomJobs(!customJobs)}
            />
          )}
          <Grid m={"md"} gutter={"md"}>
            {data}
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
