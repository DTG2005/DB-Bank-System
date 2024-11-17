import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

interface CustomerResult {
  CustomerID: number;
}

interface BranchResult {
  BranchID: number;
}

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
      branch,
    } = JSON.parse(textBody);

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
      !identificationNumber ||
      !branch
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    const queryCust =
      "INSERT INTO customer (Firstname, Middlename, Lastname, Email, Passwords, PhoneNumber, Location, DateJoined, DateOfBirth, SSN, Age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstName,
      middleName,
      lastName,
      email,
      password,
      mobileNumber,
      address,
      new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      dob,
      identificationNumber,
      new Date().getFullYear() - new Date(dob).getFullYear(),
    ];
    await db.execute(queryCust, values);

    const getCustDetails = "SELECT CustomerID FROM customer WHERE SSN = (?)";
    const [resultCustRows] = (await db.execute(getCustDetails, [
      identificationNumber,
    ])) as [CustomerResult[], any];

    const getBranchDetails =
      "SELECT BranchID FROM branch WHERE BranchName = (?)";
    const [resultBranchRows] = (await db.execute(getBranchDetails, [
      branch,
    ])) as [BranchResult[], any];

    const queryAcc =
      "INSERT INTO account (AccountType, CustomerID, Balance, BranchID, Interest, DateOpened, InterestAddDateEffective) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const valuesAcc = [
      accountType,
      resultCustRows[0]?.CustomerID,
      0,
      resultBranchRows[0]?.BranchID,
      8.5,
      new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    ];
    await db.execute(queryAcc, valuesAcc);

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
