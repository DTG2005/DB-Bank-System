import { NextResponse } from "next/server";

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

interface Debt {
  debt_type: string;
  remaining_balance: number;
  monthly_payment: number;
}

interface Asset {
  property_value: number;
  savings_account_balance: number;
  investment_value: number;
}

interface FinancialInfo {
  monthly_rent_or_mortgage: number;
  existing_debts: Debt[];
  other_financial_obligations?: Debt[];
  assets: Asset;
}

interface LoanDetails {
  loan_amount_requested: number;
  loan_purpose: string;
  loan_term_months: number;
  desired_interest_rate_type: string;
}

interface CreditInfo {
  credit_score: number;
  credit_history_length_years: number;
}

interface PersonalInfo {
  full_name: string;
  date_of_birth: string;
  national_id: string;
  citizenship: string;
  residential_status: string;
  marital_status: string;
}

interface ContactInfo {
  phone_number: string;
  email: string;
  address: Address;
}

interface Consent {
  accept_terms_and_conditions: boolean;
  authorize_credit_check: boolean;
  signature: string;
}

interface LoanApplication {
  personal_info: PersonalInfo;
  contact_info: ContactInfo;
  employment_info: EmploymentInfo;
  financial_info: FinancialInfo;
  loan_details: LoanDetails;
  credit_info: CreditInfo;
  consent: Consent;
}

// Validation function for loan application
function validateLoanApplication(data: LoanApplication): string[] {
  const errors: string[] = [];

  // Validate personal_info
  if (!data.personal_info.full_name) errors.push("Missing full_name");
  if (
    !data.personal_info.date_of_birth ||
    !/\d{4}-\d{2}-\d{2}/.test(data.personal_info.date_of_birth)
  )
    errors.push("Invalid date_of_birth");
  if (!data.personal_info.national_id) errors.push("Missing national_id");
  if (!data.personal_info.citizenship) errors.push("Missing citizenship");
  if (!data.personal_info.residential_status)
    errors.push("Missing residential_status");

  // Validate contact_info
  if (!data.contact_info.phone_number) errors.push("Missing phone_number");
  if (!data.contact_info.email || !/\S+@\S+\.\S+/.test(data.contact_info.email))
    errors.push("Invalid email");
  if (!data.contact_info.address) errors.push("Missing address");
  if (!data.contact_info.address.street)
    errors.push("Missing street in address");
  if (!data.contact_info.address.city) errors.push("Missing city in address");
  if (!data.contact_info.address.state) errors.push("Missing state in address");
  if (!data.contact_info.address.zip_code)
    errors.push("Missing zip_code in address");
  if (!data.contact_info.address.country)
    errors.push("Missing country in address");

  // Validate employment_info
  if (!data.employment_info.employment_status)
    errors.push("Missing employment_status");
  if (
    !data.employment_info.monthly_income ||
    typeof data.employment_info.monthly_income !== "number"
  )
    errors.push("Invalid monthly_income");

  // Validate financial_info
  if (
    !data.financial_info.monthly_rent_or_mortgage ||
    typeof data.financial_info.monthly_rent_or_mortgage !== "number"
  )
    errors.push("Invalid monthly_rent_or_mortgage");
  if (
    !data.financial_info.existing_debts ||
    data.financial_info.existing_debts.length === 0
  )
    errors.push("Missing existing debts");
  if (
    !data.financial_info.assets ||
    typeof data.financial_info.assets.property_value !== "number"
  )
    errors.push("Invalid assets");

  // Validate loan_details
  if (
    !data.loan_details.loan_amount_requested ||
    typeof data.loan_details.loan_amount_requested !== "number"
  )
    errors.push("Invalid loan_amount_requested");
  if (!data.loan_details.loan_purpose) errors.push("Missing loan_purpose");

  // Validate credit_info
  if (
    !data.credit_info.credit_score ||
    typeof data.credit_info.credit_score !== "number"
  )
    errors.push("Invalid credit_score");

  // Validate consent
  if (!data.consent.accept_terms_and_conditions)
    errors.push("Terms and conditions must be accepted");
  if (!data.consent.authorize_credit_check)
    errors.push("Credit check authorization is required");
  if (!data.consent.signature) errors.push("Missing signature");

  return errors;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data: LoanApplication = await request.json();

    // Validate the loan application data
    const validationErrors = validateLoanApplication(data);

    if (validationErrors.length > 0) {
      // If there are validation errors, respond with a 400 status and the errors
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Placeholder for further processing (Database integration)
    return NextResponse.json(
      { message: "Application received and valid. Processing placeholder." },
      { status: 200 }
    );
  } catch (error) {
    // Narrow down the error type
    let errorMessage = "An unexpected error occurred";

    if (error instanceof SyntaxError) {
      errorMessage = "Invalid JSON format";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    // If there is an error with parsing or processing the request, return a 400 status
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
