import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get("formType");
    console.log("form type", formType);

    if (!formType) {
      return NextResponse.json(
        { message: "Form type is required" },
        { status: 400 }
      );
    }

    const data = await req.json();
    console.log("we are here: ", data);

    // Define the path to the JSON file based on form type
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      `${formType}Data.json`
    );
    console.log("file path", filePath);

    // Ensure the data directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    console.log("Directory created");

    let existingData = [];
    if (fs.existsSync(filePath)) {
      console.log("File exists");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      try {
        existingData = JSON.parse(fileContent);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        existingData = [];
      }
    }

    // Append the new data
    existingData.push(data);
    console.log("pushing");

    // Write the updated data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log("write data to file");

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
