import { useState } from 'react';
import Layout from "../components/Layout";
import { Container, Title } from "@mantine/core";
import { Input, Text, MantineProvider, Space, Avatar, FileButton, Button, Group, Table, Select, Textarea, Checkbox } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { TextInput, Switch, ActionIcon, Box, Code } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
export default function ResumeBuilder() {
    const [file, setFile] = useState<File | null>(null);
    const form = useForm({
        initialValues: {
            languages: [{ name: '',  key: randomId() }],
        },
    });
    const form1 = useForm({
        initialValues: {
            skill: [{ name: '',  key: randomId() }],
        },
    });

    const fields = form.values.languages.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="English"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`languages.${index}.name`)}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('languages', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));
    const skills = form1.values.skill.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="Reading"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`skill.${index}.name`)}
            />
            <ActionIcon color="red" onClick={() => form1.removeListItem('skill', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    return (
        <Layout>
            <Container>
                <Title order={1}>Resume Builder</Title>
                <Space h="xl" />
                <MantineProvider
                    theme={{
                        fontFamily: 'Verdana, sans-serif',
                        fontFamilyMonospace: 'Monaco, Courier, monospace',
                        headings: { fontFamily: 'Times New Roman' },
                    }}
                ><Title fw={600} order={4}>What’s the best way for employers to contact you?</Title>
                    <Space h="lg" />

                    <Table>
                        <tr>
                            <td>

                                <Avatar h={200} radius="xs" size={150} src="" />
                                <>
                                    <Space h="lg"></Space>
                                    <Group>
                                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                            {(props) => <Button {...props}>Upload image</Button>}
                                        </FileButton>
                                    </Group>

                                    {file && (
                                        <Text size="sm" mt="sm">
                                            Picked file: {file.name}
                                        </Text>
                                    )}
                                </>
                            </td>
                            <td>
                                <Table>
                                    <tr>
                                        <Text size={10}>* indicates a required fields</Text>
                                    </tr>
                                    <tr>
                                        <td>

                                            <Input.Wrapper label="FIRST NAME" maw={320} mx="auto">
                                                <Input placeholder="First Name" />
                                            </Input.Wrapper>
                                        </td>
                                        <td colSpan={2}>

                                            <Input.Wrapper label="LAST NAME" maw={320} mx="auto">
                                                <Input placeholder="Last Name" />
                                            </Input.Wrapper>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Input.Wrapper label="CITY" maw={320} mx="auto">
                                            <Input placeholder="City" />
                                        </Input.Wrapper></td>
                                        <td><Input.Wrapper label="COUNTRY" maw={130} mx="auto">
                                            <Input placeholder="e.g. india" />
                                        </Input.Wrapper></td>
                                        <td><Input.Wrapper label="PIN CODE" maw={130} mx="auto">
                                            <Input placeholder="e.g. 110034" />
                                        </Input.Wrapper></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Input.Wrapper label="PHONE" maw={320} mx="auto">
                                                <Input<any> placeholder="e.g. +91 12345 67890" />
                                            </Input.Wrapper>
                                        </td>
                                        <td colSpan={2}><Input.Wrapper label="EMAIL" required maw={320} mx="auto">
                                            <Input placeholder="e.g. abc123@gmail.com" />
                                        </Input.Wrapper></td>
                                    </tr>
                                </Table>
                            </td>
                        </tr>
                    </Table>

                    <Title order={4}>Tell us about your education</Title>
                    <Table>
                        <tr>
                            <td>

                                <Input.Wrapper label="SCHOOL NAME" maw={320} mx="auto">
                                    <Input placeholder="e.g. Sarvajanik College of Engineering and Technology" />
                                </Input.Wrapper>
                            </td>
                            <td colSpan={2}>

                                <Input.Wrapper label="SCHOOL LOCATION" maw={320} mx="auto">
                                    <Input placeholder="e.g. Surat,Gujarat" />
                                </Input.Wrapper>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input.Wrapper maw={320} mx="auto">
                                    <Select label="DEGREE" placeholder="BE" data={[
                                        { value: 'C0', label: 'COMPUTER' },
                                        { value: 'EC', label: 'ELECTRICAL' },
                                        { value: 'IT', label: 'INFORMATION TECHNOLOGY' },
                                        { value: 'MECH', label: 'MECHNICAL ENGINEERING' },
                                    ]} w={400} />
                                </Input.Wrapper>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input.Wrapper label="FIELD OF STUDY" maw={320} mx="auto">
                                    <Input<any> placeholder="e.g. Financial Accounting" />
                                </Input.Wrapper>
                            </td>
                            <td><Input.Wrapper label="Date" maw={320} mx="auto">
                                <DatePicker placeholder='Date' />
                            </Input.Wrapper></td>
                        </tr>
                    </Table>
                    <Title order={4}>Tell us about your experience</Title>
                    <Table>
                        <tr>
                            <td colSpan={2}>

                                <Input.Wrapper label="WHAT WAS YOUR TITLE? *" maw={320} mx="auto">
                                    <Input placeholder="First Name" />
                                </Input.Wrapper>
                            </td>
                            <td colSpan={2}>

                                <Input.Wrapper label="WHO DID YOU DO THIS FOR?" maw={320} mx="auto">
                                    <Input placeholder="Last Name" />
                                </Input.Wrapper>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><Input.Wrapper label="CITY" maw={320} mx="auto">
                                <Input placeholder="City" />
                            </Input.Wrapper></td>
                            <td><Input.Wrapper label="COUNTRY" maw={100} mx="auto">
                                <Input placeholder="e.g. india" />
                            </Input.Wrapper></td>
                            <td><Input.Wrapper label="PIN CODE" maw={100} mx="auto">
                                <Input placeholder="e.g. 110034" />
                            </Input.Wrapper></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Input.Wrapper label="START DATE" maw={320} mx="auto">
                                    <DatePicker placeholder='start date' />
                                </Input.Wrapper>
                            </td>
                            <td colSpan={2}><Input.Wrapper label="END DATE" required maw={320} mx="auto">
                                <DatePicker placeholder='end date' />
                            </Input.Wrapper></td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}><Checkbox
                                label="I am currenty work here"
                            /></td>
                        </tr>
                    </Table>

                    <Title order={4}>What skills would you like to highlight?</Title>
                    <Box maw={500} mx="auto">
                        {skills.length > 0 ? (
                            <Group mb="xs">
                                <Text weight={500} size="sm" sx={{ flex: 1 }}>
                                    Skills
                                </Text>
                            </Group>
                        ) : (
                            <Text color="dimmed" align="center">
                                No one here...
                            </Text>
                        )}

                        {skills}

                        <Group position="center" mt="md">
                            <Button
                                onClick={() =>
                                    form1.insertListItem('skill', { name: '', key: randomId() })
                                }
                            >
                                Add Skill
                            </Button>
                        </Group>

                    </Box>
                    <Title order={4}>Summary</Title>
                    <Textarea
                        placeholder="Write your summery here"
                        label="Briefly tell us about your background"
                        withAsterisk
                    />
                    <Title order={4}>Add languages you know</Title>
                    <Box maw={500} mx="auto">
                        {fields.length > 0 ? (
                            <Group mb="xs">
                                <Text weight={500} size="sm" sx={{ flex: 1 }}>
                                    Languages
                                </Text>
                            </Group>
                        ) : (
                            <Text color="dimmed" align="center">
                                No one here...
                            </Text>
                        )}

                        {fields}

                        <Group position="center" mt="md">
                            <Button
                                onClick={() =>
                                    form.insertListItem('languages', { name: '', key: randomId() })
                                }
                            >
                                Add language
                            </Button>
                        </Group>

                    </Box>


                </MantineProvider>
            </Container>
        </Layout>
    )
}
import { IconAt } from '@tabler/icons-react';

