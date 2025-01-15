import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const formType = searchParams.get("formType");

  if (!formType) {
    return NextResponse.json(
      { message: "Form type is required" },
      { status: 400 }
    );
  }

  const data = await req.json();

  // Define the path to the JSON file based on form type
  const filePath = path.join(process.cwd(), "data", `${formType}Data.json`);

  // Ensure the data directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the data to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "Data saved successfully" });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
