import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

interface EmploymentInfo {
  employment_status: string;
  occupation: string;
  employer_name: string;
  employer_address: string;
  monthly_income: number;
  years_at_job: number;
}

interface LoanInfo {
  total_loan_amount: number;
  monthly_payment: number;
}

interface CreditCardInfo {
  total_credit_limit: number;
  current_balance: number;
}

interface FinancialInfo {
  bank_account?: {
    account_number: string;
    bank_name: string;
  };
  monthly_rent_or_mortgage: number;
  existing_loans: LoanInfo;
  other_credit_cards: CreditCardInfo;
}

interface PersonalInfo {
  full_name: string;
  date_of_birth: string;
  national_id: string;
  citizenship: string;
  residential_status: string;
}

interface ContactInfo {
  phone_number: string;
  email: string;
  address: Address;
}

interface Consent {
  accept_terms_and_conditions: boolean;
  signature: string;
}

interface CreditCardApplication {
  personal_info: PersonalInfo;
  contact_info: ContactInfo;
  employment_info: EmploymentInfo;
  financial_info: FinancialInfo;
  consent: Consent;
}

// Validation function to check each field
function validateApplication(data: CreditCardApplication) {
  const errors: string[] = [];

  // Validate personal_info
  if (!data.personal_info) errors.push("Missing personal_info");
  if (
    !data.personal_info.full_name ||
    typeof data.personal_info.full_name !== "string"
  )
    errors.push("Invalid full_name");
  if (
    !data.personal_info.date_of_birth ||
    !/\d{4}-\d{2}-\d{2}/.test(data.personal_info.date_of_birth)
  )
    errors.push("Invalid date_of_birth");
  if (
    !data.personal_info.national_id ||
    typeof data.personal_info.national_id !== "string"
  )
    errors.push("Invalid national_id");
  if (
    !data.personal_info.citizenship ||
    typeof data.personal_info.citizenship !== "string"
  )
    errors.push("Invalid citizenship");
  if (
    !data.personal_info.residential_status ||
    typeof data.personal_info.residential_status !== "string"
  )
    errors.push("Invalid residential_status");

  // Validate contact_info
  if (!data.contact_info) errors.push("Missing contact_info");
  if (
    !data.contact_info.phone_number ||
    typeof data.contact_info.phone_number !== "string"
  )
    errors.push("Invalid phone_number");
  if (!data.contact_info.email || !/\S+@\S+\.\S+/.test(data.contact_info.email))
    errors.push("Invalid email");
  if (!data.contact_info.address) errors.push("Missing address");
  if (
    !data.contact_info.address.street ||
    typeof data.contact_info.address.street !== "string"
  )
    errors.push("Invalid address street");
  if (
    !data.contact_info.address.city ||
    typeof data.contact_info.address.city !== "string"
  )
    errors.push("Invalid address city");
  if (
    !data.contact_info.address.state ||
    typeof data.contact_info.address.state !== "string"
  )
    errors.push("Invalid address state");
  if (
    !data.contact_info.address.zip_code ||
    typeof data.contact_info.address.zip_code !== "string"
  )
    errors.push("Invalid address zip_code");
  if (
    !data.contact_info.address.country ||
    typeof data.contact_info.address.country !== "string"
  )
    errors.push("Invalid address country");

  // Validate employment_info
  if (!data.employment_info) errors.push("Missing employment_info");
  if (
    !data.employment_info.employment_status ||
    typeof data.employment_info.employment_status !== "string"
  )
    errors.push("Invalid employment_status");
  if (
    !data.employment_info.monthly_income ||
    typeof data.employment_info.monthly_income !== "number"
  )
    errors.push("Invalid monthly_income");

  // Validate financial_info
  if (!data.financial_info) errors.push("Missing financial_info");
  if (typeof data.financial_info.monthly_rent_or_mortgage !== "number")
    errors.push("Invalid monthly_rent_or_mortgage");
  if (
    !data.financial_info.existing_loans ||
    typeof data.financial_info.existing_loans.total_loan_amount !== "number"
  )
    errors.push("Invalid total_loan_amount");
  if (typeof data.financial_info.existing_loans.monthly_payment !== "number")
    errors.push("Invalid monthly_payment");
  if (
    !data.financial_info.other_credit_cards ||
    typeof data.financial_info.other_credit_cards.total_credit_limit !==
      "number"
  )
    errors.push("Invalid total_credit_limit");
  if (
    typeof data.financial_info.other_credit_cards.current_balance !== "number"
  )
    errors.push("Invalid current_balance");

  // Validate consent
  if (!data.consent || data.consent.accept_terms_and_conditions !== true)
    errors.push("Consent must be given");
  if (!data.consent.signature || typeof data.consent.signature !== "string")
    errors.push("Invalid signature");

  return errors;
}

export async function POST(request: Request) {
  try {
    const data: CreditCardApplication = await request.json();

    // Validate the data
    const validationErrors = validateApplication(data);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Placeholder for further processing (e.g., saving to the database)
    // We don't need an ID since autoincrement is a thing
    // What we do need is AccountID
    const accnum = data.financial_info.bank_account?.account_number;

    // Again, Credit Card number is autoincrement
    // We need expiry date, which will be 4 years from issue, which is 4 years from now in month
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 4);
    expiry.setMonth(expiry.getMonth() + 1);

    // Credit Limit is a set const. Let's take 100,000
    const creditLimit = 100000;

    // Current Balance is initially
    const currentBalance = creditLimit;

    const query =
      "INSERT INTO credit_cards (accnum, expiry, creditLimit, currentBalance) VALUES (?, ?, ?, ?)";
    const values = [accnum, expiry, creditLimit, currentBalance];
    await db.execute(query, values);

    return NextResponse.json(
      { message: "Application received and valid. Processing placeholder." },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Invalid request body", error: error.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { message: "Invalid request body", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
