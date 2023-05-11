import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Container, Image, Modal, Stack, Title } from "@mantine/core";
import {
    Input,
    Text,
    MantineProvider,
    Space,
    Avatar,
    FileButton,
    Button,
    Group,
    Table,
    Select,
    Textarea,
    Checkbox,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TextInput, Switch, ActionIcon, Box, Code } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

const resumeTypes = [
    { value: "1", label: "Type 1" },
    { value: "2", label: "Type 2" },
    { value: "3", label: "Type 3" },
    { value: "4", label: "Type 4" },
    { value: "5", label: "Type 5" },
];
export default function ResumeBuilder() {
    const [mounted, setMounted] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            firstName: "",
            lastName: "",
            city: "",
            country: "",
            email: "",
            phone: "",
            pinCode: "",
            schoolName: "",
            schoolLocation: "",
            degree: "",
            fieldOfStudy: "",
            schoolStartDate: new Date(),
            expTitle: "",
            expCompany: "",
            expCity: "",
            expCountry: "",
            expPinCode: "",
            expStartDate: new Date(),
            expEndDate: new Date(),
            expCurrentlyWorking: false,
            summary: "",
            languages: [{ name: "", key: randomId() }],
            skill: [{ name: "", key: randomId() }],
            resumeType: "1",
        },
        validate: {
            firstName: (value) =>
                value.trim().length > 0 ? null : "Please enter your first name",
            lastName: (value) =>
                value.trim().length > 0 ? null : "Please enter your last name",
            email: (value) =>
                value.trim().length > 0 ? null : "Please enter your email",
            phone: (value) =>
                value.trim().length > 0 ? null : "Please enter your phone",
            pinCode: (value) =>
                value.trim().length > 0 ? null : "Please enter your pin code",
            schoolName: (value) =>
                value.trim().length > 0
                    ? null
                    : "Please enter your school name",
            schoolLocation: (value) =>
                value.trim().length > 0
                    ? null
                    : "Please enter your school location",
            degree: (value) =>
                value.trim().length > 0 ? null : "Please enter your degree",
            fieldOfStudy: (value) =>
                value.trim().length > 0
                    ? null
                    : "Please enter your field of study",
            // expTitle: (value) =>
            //     value.trim().length > 0
            //         ? null
            //         : "Please enter your experience title",
            // expCompany: (value) =>
            //     value.trim().length > 0
            //         ? null
            //         : "Please enter your experience company",
            // expCity: (value) =>
            //     value.trim().length > 0
            //         ? null
            //         : "Please enter your experience city",
            // expCountry: (value) =>
            //     value.trim().length > 0
            //         ? null
            //         : "Please enter your experience country",
            // expPinCode: (value) =>
            //     value.trim().length > 0
            //         ? null
            //         : "Please enter your experience pin code",
            summary: (value) =>
                value.trim().length > 0 && value.trim().length <= 100
                    ? null
                    : "Please enter your summary in (1-100 characters)",
            skill: (value) =>
                value.length > 1 ||
                    (value.length === 1 && value[0].name.trim().length > 0)
                    ? null
                    : "Please enter your skills",
            languages: (value) =>
                value.length > 1 ||
                    (value.length === 1 && value[0].name.trim().length > 0)
                    ? null
                    : "Please enter your language",
        },
    });

    const fields = form.values.languages.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="English"
                sx={{ flex: 1 }}
                {...form.getInputProps(`languages.${index}.name`)}
            />
            <ActionIcon
                color="red"
                onClick={() => {
                    form.values.languages.length > 1 &&
                        form.removeListItem("languages", index);
                }}
            >
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));
    const skills = form.values.skill.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="Reading"
                sx={{ flex: 1 }}
                {...form.getInputProps(`skill.${index}.name`)}
            />
            <ActionIcon
                color="red"
                onClick={() => {
                    form.values.skill.length > 1 &&
                        form.removeListItem("skill", index);
                }}
            >
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    useEffect(() => {
        setMounted(true);
    }, []);

    function save(filename: string, data: Blob) {
        // const blob = new Blob([data], { type: "text/csv" });
        // type docx
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if ((window as any).navigator.msSaveOrOpenBlob) {
            (window as any).navigator.msSaveBlob(blob, filename);
        } else {
            const elem = window.document.createElement("a");
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }

    async function getResume(values: typeof form.values) {
        const res = await fetch("/api/generateResume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const blob = await res.blob();
        console.log("res", blob);
        save("resume.docx", blob);
    }

    return (
        <Layout>
            {mounted && (
                <Container>
                    <form
                        onSubmit={form.onSubmit((values) => getResume(values))}
                    >
                        <Title order={1}>Resume Builder</Title>
                        <Space h="xl" />
                        <Title fw={600} order={4}>
                            What’s the best way for employers to contact you?
                        </Title>
                        <Space h="lg" />

                        <Table>
                            <tr>
                                <td>
                                    <TextInput
                                        label="FIRST NAME"
                                        maw={320}
                                        mx={70}
                                        placeholder="First Name"
                                        required
                                        {...form.getInputProps("firstName")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <TextInput
                                        label="LAST NAME"
                                        maw={320}
                                        mx={70}
                                        placeholder="Last Name"
                                        required
                                        {...form.getInputProps("lastName")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextInput
                                        label="CITY"
                                        maw={320}
                                        mx={70}
                                        placeholder="City"
                                        required
                                        {...form.getInputProps("city")}
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        label="COUNTRY"
                                        maw={90}
                                        mx="auto"
                                        placeholder="e.g. india"
                                        required
                                        {...form.getInputProps("country")}
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        label="PIN CODE"
                                        maw={90}
                                        mx="auto"
                                        placeholder="e.g. 110034"
                                        required
                                        {...form.getInputProps("pinCode")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextInput
                                        label="PHONE"
                                        maw={320}
                                        mx={70}
                                        placeholder="e.g. +91 12345 67890"
                                        required
                                        {...form.getInputProps("phone")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <TextInput
                                        label="EMAIL"
                                        required
                                        maw={320}
                                        mx={70}
                                        placeholder="e.g. abc123@gmail.com"
                                        {...form.getInputProps("email")}
                                    />
                                </td>
                            </tr>
                        </Table>

                        <Title order={4}>Tell us about your education</Title>
                        <Table>
                            <tr >
                                <td>
                                    <TextInput
                                        label="SCHOOL NAME"
                                        maw={320}
                                        mx={70}
                                        placeholder="e.g. Sarvajanik College of Engineering and Technology"
                                        required
                                        {...form.getInputProps("schoolName")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <TextInput
                                        label="SCHOOL LOCATION"
                                        maw={320}
                                        mx={45}
                                        placeholder="e.g. Surat,Gujarat"
                                        required
                                        {...form.getInputProps(
                                            "schoolLocation"
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <Select
                                        required
                                        maw={320}
                                        mx={70}
                                        label="DEGREE"
                                        placeholder="BE"
                                        data={[
                                            {
                                                value: "CO",
                                                label: "COMPUTER",
                                            },
                                            {
                                                value: "EC",
                                                label: "ELECTRICAL",
                                            },
                                            {
                                                value: "IT",
                                                label: "INFORMATION TECHNOLOGY",
                                            },
                                            {
                                                value: "MECH",
                                                label: "MECHNICAL ENGINEERING",
                                            },
                                        ]}
                                        w={400}
                                        {...form.getInputProps("degree")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextInput
                                        label="FIELD OF STUDY"
                                        maw={320}
                                        mx={70}
                                        placeholder="e.g. Financial Accounting"
                                        required
                                        {...form.getInputProps("fieldOfStudy")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <DatePicker
                                        label="Date"
                                        maw={320}
                                        mx={45}
                                        placeholder="Date"
                                        required
                                        {...form.getInputProps(
                                            "schoolStartDate"
                                        )}
                                    />
                                </td>
                            </tr>
                        </Table>
                        <Title order={4}>Tell us about your experience</Title>
                        <Table>
                            <tr>
                                <td colSpan={2}>
                                    <TextInput
                                        label="WHAT WAS YOUR TITLE?"
                                        maw={320}
                                        mx={70}
                                        placeholder="Devops Engineering"
                                        {...form.getInputProps("expTitle")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <TextInput
                                        label="WHO DID YOU DO THIS FOR?"
                                        maw={320}
                                        mx={70}
                                        placeholder="Google"
                                        {...form.getInputProps("expCompany")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <TextInput
                                        label="CITY"
                                        maw={320}
                                        mx={70}
                                        placeholder="City"
                                        {...form.getInputProps("expCity")}
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        label="COUNTRY"
                                        maw={90}
                                        mx="auto"
                                        placeholder="e.g. india"
                                        {...form.getInputProps("expCountry")}
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        label="PIN CODE"
                                        maw={90}
                                        mx="auto"
                                        placeholder="e.g. 110034"
                                        {...form.getInputProps("expPinCode")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <DatePicker
                                        label="START DATE"
                                        maw={320}
                                        mx={70}
                                        placeholder="start date"
                                        {...form.getInputProps("expStartDate")}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <DatePicker
                                        label="END DATE"
                                        maw={320}
                                        mx={70}
                                        placeholder="end date"
                                        {...form.getInputProps("expEndDate")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox mx={70} label="I am currenty work here" />
                                </td>
                            </tr>
                        </Table>

                        <Title order={4}>
                            What skills would you like to highlight?
                        </Title>
                        <Table>
                            <tr>
                                <td>
                                    <Box mx={70}>
                                        <Group mb="xs">
                                            <Text
                                                weight={500}
                                                size="sm"
                                                sx={{ flex: 1 }}
                                                {...(form.isValid("skill")
                                                    ? {}
                                                    : { color: "red" })}
                                            >
                                                Skills{" "}
                                                {form.isValid("skill")
                                                    ? ""
                                                    : "(add at least one skill)"}
                                            </Text>
                                        </Group>
                                        {skills}
                                    </Box>
                                </td>
                                <td>
                                    <Box mx={90}>

                                        <Group position="center" mt="md">
                                            <Button
                                                onClick={() =>
                                                    form.insertListItem("skill", {
                                                        name: "",
                                                        key: randomId(),
                                                    })
                                                }
                                            >
                                                Add Skill
                                            </Button>
                                        </Group>
                                    </Box>
                                </td>
                            </tr>
                        </Table>
                        <Title order={4}>Summary</Title>
                        <Textarea
                            placeholder="Write your summery here"
                            mx={70}
                            label="Briefly tell us about your background"
                            required
                            {...form.getInputProps("summary")}
                        />
                        <Title order={4}>Add languages you know</Title>
                        <Table>
                            <tr>
                                <td>
                                    <Box mx={70}>
                                        <Group mb="xs">
                                            <Text
                                                weight={500}
                                                size="sm"
                                                sx={{ flex: 1 }}
                                                {...(form.isValid("languages")
                                                    ? {}
                                                    : { color: "red" })}
                                            >
                                                Languages{" "}
                                                {form.isValid("languages")
                                                    ? ""
                                                    : "(add at least one language)"}
                                            </Text>
                                        </Group>
                                        {fields}
                                    </Box>
                                </td>
                                <td>
                                    <Box mx={70}>


                                        <Group position="center" mt="md">
                                            <Button
                                                onClick={() =>
                                                    form.insertListItem("languages", {
                                                        name: "",
                                                        key: randomId(),
                                                    })
                                                }
                                            >
                                                Add language
                                            </Button>
                                        </Group>
                                    </Box>
                                </td>
                            </tr>
                        </Table>
                        <Table>
                            <tr>
                                <td>

                                </td>
                            </tr>
                        </Table>

                        <Group position="center" mt="md">
                            <Select
                                label="Resume Type"
                                placeholder="Pick one"
                                data={resumeTypes}
                                {...form.getInputProps("resumeType")}
                            />
                            <Button
                                sx={{ alignSelf: "flex-end" }}
                                onClick={() => {
                                    setModalOpened(true);
                                }}
                            >
                                Preview
                            </Button>
                            <Modal
                                opened={modalOpened}
                                onClose={() => setModalOpened(false)}
                                title="Resume Type Preview"
                            >
                                <Image
                                    src={
                                        "resume" +
                                        form.values.resumeType +
                                        ".webp"
                                    }
                                />
                            </Modal>
                        </Group>
                        <Group position="center" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </form>
                </Container>
            )}
        </Layout>
    );
}
