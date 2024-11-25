import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Define the POST handler
export async function POST() {
  try {
    // Path to the file
    const filePath = path.join(process.cwd(), "data", "mock.txt");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Parse the file into rows and columns
    const rows = fileContent
      .trim()
      .split("\n")
      .map((row) => row.split(" ").map(Number));

    // Extract each column into variables
    const realPower = rows.map((row) => row[0]);
    const apparentPower = rows.map((row) => row[1]);
    const vrms = rows.map((row) => row[2]);
    const irms = rows.map((row) => row[3]);
    const powerFactor = rows.map((row) => row[4]);

    // Return the data in JSON format
    return NextResponse.json({
      realPower,
      apparentPower,
      vrms,
      irms,
      powerFactor,
    });
  } catch {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
