// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const textBody = await req.text();
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
      mobile,
      accountType,
      address,
      dob,
      identificationNumber,
    } = JSON.parse(textBody);

    // Use ?? operator to replace undefined with null for SQL
    const mobileValue = mobile ?? null;
    console.log("email:" + email);
    const emailValue = email === undefined ? null : email;
    const passwordValue = password ? password : null;
    const accountTypeValue = accountType ? accountType : null;
    const addressValue = address ? address : null;
    const dobValue = dob ? dob : null;
    const identificationNumberValue = identificationNumber
      ? identificationNumber
      : null;

    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !accountType ||
      !address ||
      !dob
      // !identificationNumber
    ) {
      return NextResponse.json(
        { error: "All fields are required." + textBody },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // const createTableQuery =
    //   "CREATE TABLE IF NOT EXISTS customer (mobile VARCHAR(20), email VARCHAR(255), passwordValue VARCHAR(255))";
    // await db.execute(createTableQuery);

    const query =
      "INSERT INTO customer (Firstname, Middlename, Lastname, ) VALUES (?, ?, ?)";
    const values = [mobileValue, emailValue, passwordValue];
    const value1 = await db.execute(query, values);

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
