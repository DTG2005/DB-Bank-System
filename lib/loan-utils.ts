// app/lib/loan-utils.ts
export interface LoanType {
  title: string;
  description: string;
  interestRate: string;
  termLength: string;
  maxAmount: string;
  questions: string[];
}

export const loanTypes: LoanType[] = [
  {
    title: 'Personal Loan',
    description: 'Flexible personal loans with competitive interest rates starting from 8.99% p.a.',
    interestRate: '8.99',
    termLength: '1-5 years',
    maxAmount: '$500,000',
    questions: [
      'Do you have a steady source of income?',
      'Do you have any outstanding debts?',
      'Are you willing to provide collateral if necessary?',
      'Is your credit score above 650?',
      'Are you employed full-time or part-time?'
    ]
  },
  {
    title: 'Student Loan',
    description: 'Affordable education financing options to help you achieve your academic goals.',
    interestRate: '4.99',
    termLength: '5-15 years',
    maxAmount: '$100,000',
    questions: [
      'Are you currently enrolled in an accredited institution?',
      'Do you have a co-signer or guarantor?',
      'Will you use the loan solely for educational purposes?',
      'Do you have proof of enrollment or an acceptance letter?',
      'Do you have any existing student loans?'
    ]
  }
];

export const getLoanType = (loanType: string): LoanType | undefined => {
  return loanTypes.find(loan => loan.title === loanType);
};

export const calculateMonthlyPayment = (principalAmount: number, interestRate: number, termLength: number): number => {
  const monthlyRate = interestRate / 100 / 12;
  const months = termLength * 12;
  return (principalAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
};

// Database connection pool with connection timeout adjustment
import mysql2 from 'mysql2/promise';

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  connectTimeout: 300000,  // Set the timeout to 30 seconds
});