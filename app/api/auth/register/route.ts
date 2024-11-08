// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const textBody = await req.text();
    const { mobile, email, password } = JSON.parse(textBody);

    // Use ?? operator to replace undefined with null for SQL
    const mobileValue = mobile ?? null;
    console.log("email:" + email);
    const emailValue = email === undefined ? null : email;
    const passwordValue = password ? await bcrypt.hash(password, 10) : null;

    const createTableQuery =
      "CREATE TABLE IF NOT EXISTS users (mobile VARCHAR(20), email VARCHAR(255), passwordValue VARCHAR(255))";
    await db.execute(createTableQuery);

    const query =
      "INSERT INTO users (mobile, email, passwordValue) VALUES (?, ?, ?)";
    const values = [mobileValue, emailValue, passwordValue];
    await db.execute(query, values);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error to debug
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}
