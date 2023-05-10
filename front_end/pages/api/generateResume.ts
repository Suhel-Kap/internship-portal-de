// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import {
    ExternalHyperlink,
    HeadingLevel,
    ImageRun,
    Paragraph,
    patchDocument,
    PatchType,
    Table,
    TableCell,
    TableRow,
    TextDirection,
    TextRun,
    VerticalAlign,
} from "docx";

import fs from "fs";

// // @ts-ignore
// import formidable from "formidable";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

type Data = Buffer | string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const requestBody = req.body;
        console.log(requestBody);
        const response = await fetch("http://localhost:4000/addDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers":
                    "Content-Type, Authorization, Content-Length, X-Requested-With",
            },
            body: JSON.stringify(requestBody),
        });
        const resJson = await response.json();
        console.log("res", resJson);
        if (resJson.status === "success") {
            console.log("success");
        }

        if (resJson.status === "error") {
            console.log("error");
        }

        patchDocument(fs.readFileSync("assets/resume.docx"), {
            patches: {
                name: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.firstName + " " + requestBody.lastName
                        ),
                    ],
                },
                city: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.city)],
                },
                pinCode: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.pinCode)],
                },
                country: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.country)],
                },
                email: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.email)],
                },
                phone: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.phone)],
                },
                schoolName: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.schoolName)],
                },
                schoolLocation: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.schoolLocation)],
                },
                degree: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.degree)],
                },
                fieldOfStudy: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.fieldOfStudy)],
                },
                schoolStartDate: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            new Date(
                                requestBody.schoolStartDate
                            ).toLocaleDateString()
                        ),
                    ],
                },
                expTitle: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.expTitle == ""
                                ? "Title"
                                : requestBody.expTitle
                        ),
                    ],
                },
                expCompany: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.expCompany == ""
                                ? "Company"
                                : requestBody.expCompany
                        ),
                    ],
                },
                expCountry: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.expCountry == ""
                                ? "Country"
                                : requestBody.expCountry
                        ),
                    ],
                },
                expCity: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.expCity == ""
                                ? "City"
                                : requestBody.expCity
                        ),
                    ],
                },
                expStartDate: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            new Date(
                                requestBody.expStartDate
                            ).toLocaleDateString()
                        ),
                    ],
                },
                expEndDate: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            new Date(
                                requestBody.expEndDate
                            ).toLocaleDateString()
                        ),
                    ],
                },
                languages: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.languages
                                .map((language: any) => language.name)
                                .toLocaleString()
                        ),
                    ],
                },
                skills: {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun(
                            requestBody.skill
                                .map((skill: any) => skill.name)
                                .toLocaleString()
                        ),
                    ],
                },
                summary: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun(requestBody.summary)],
                },
            },
        }).then((doc) => {
            // console.log("doc", doc);
            res.status(200).send(doc);
            // fs.writeFileSync("My Document.docx", doc);
        });
    } else {
        res.status(405).send("Method not allowed");
    }
}
