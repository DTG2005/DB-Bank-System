// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { RowDataPacket, FieldPacket } from "mysql2";

interface User {
  mobile: string;
  email: string;
  passwordValue: string;
}

export async function POST(req: NextRequest) {
  try {
    const textBody = await req.text();
    const resp = JSON.parse(textBody);

    const email = resp.internetBankingId;
    const password = resp.password;

    console.log(textBody);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const query = "SELECT * FROM customer WHERE email = ?";

    // Specify the type of the result as [User[] & RowDataPacket[], FieldPacket[]]
    const [rows] = (await db.execute(query, [email])) as [
      User[] & RowDataPacket[],
      FieldPacket[]
    ];

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const user = rows[0];
    const passwordMatch = password === user.Passwords;

    if (!passwordMatch) {
      console.log(user.Passwords, password);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Redirect to dashboard route if logged in successfully
    return NextResponse.json(
      { message: "User logged in successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to login user." },
      { status: 500 }
    );
  }
}
