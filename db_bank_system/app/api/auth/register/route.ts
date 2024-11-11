// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const textBody = await req.text();
    const {
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      accountType,
      address,
      dob,
      identificationNumber,
    } = JSON.parse(textBody);

    const passwordValue = password ? await bcrypt.hash(password, 10) : null;

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        email VARCHAR(255),
        password VARCHAR(255),
        mobileNumber VARCHAR(20),
        accountType VARCHAR(20),
        address TEXT,
        dob DATE,
        identificationNumber VARCHAR(50)
      )`;
    await db.execute(createTableQuery);

    const insertQuery = `
      INSERT INTO users (firstName, lastName, email, password, mobileNumber, accountType, address, dob, identificationNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      firstName ?? null,
      lastName ?? null,
      email ?? null,
      passwordValue,
      mobileNumber ?? null,
      accountType ?? null,
      address ?? null,
      dob ?? null,
      identificationNumber ?? null,
    ];

    await db.execute(insertQuery, values);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error); // Log the error to debug
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}
