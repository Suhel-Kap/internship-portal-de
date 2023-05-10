export default function Resume() {
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
    async function getResume() {
        const res = await fetch("/api/hello");
        const blob = await res.blob();
        console.log("res", blob);
        save("resume.docx", blob);
    }

    async function getData() {
        const response = await fetch(
            "http://localhost:4000/addDetail/ahmedaghadi123@gmail.com",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization, Content-Length, X-Requested-With",
                },
            }
        );
        const resJson = await response.json();
        console.log("res", resJson);
        if (resJson.status === "success") {
            console.log("success");
        }

        if (resJson.status === "error") {
            console.log("error");
        }
    }
    return (
        <>
            <button onClick={getResume}>Get Resume</button>
            <button onClick={getData}>Get Data</button>
        </>
    );
}
