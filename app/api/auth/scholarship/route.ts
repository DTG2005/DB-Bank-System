import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database and run a query
    const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM Scholarship');

    // Return the data as JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}