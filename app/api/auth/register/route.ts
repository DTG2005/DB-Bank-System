// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

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
      mobileNumber,
      accountType,
      address,
      dob,
      identificationNumber,
    } = JSON.parse(textBody);

    // Use ?? operator to replace undefined with null for SQL
    const mobileValue = mobileNumber ?? null;
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
      !mobileNumber ||
      !accountType ||
      !address ||
      !dob ||
      !identificationNumber
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

    const queryCust =
      "INSERT INTO customer (Firstname, Middlename, Lastname, Email, Passwords, PhoneNumber, Location, DateJoined, DateOfBirth, SSN, Age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstName,
      middleName,
      lastName,
      emailValue,
      passwordValue,
      mobileValue,
      addressValue,
      new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      dobValue,
      identificationNumberValue,
      new Date().getFullYear() - new Date(dobValue).getFullYear(),
    ];
    await db.execute(queryCust, values);

    const getCustDetails = "";

    const queryAcc =
      "INSERT INTO account (AccountType, AccountNumber, Balance, CustomerID) VALUES (?, ?, ?, ?)";

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else if (typeof error === "string") {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}
