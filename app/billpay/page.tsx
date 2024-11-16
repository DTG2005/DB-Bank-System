"use client";
import { useState } from 'react';

export default function BillPayments() {
 const [billType, setBillType] = useState('');
 const [accountId, setAccountId] = useState('');
 const [amount, setAmount] = useState('');
 const [status, setStatus] = useState('');
 const [paymentHistory, setPaymentHistory] = useState([]);

 const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   try {
     const response = await fetch('/api/auth/transaction', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
        transactionType: 'BILL_PAYMENT',
        details: {
          accountId,
          billType,
          amount: parseFloat(amount),
        },
      }),
     });
     const data = await response.json();
     setStatus(data.message );

   } catch (error) {
     setStatus('Payment failed');
   }
 };



 return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
       <h2 className="text-2xl font-bold mb-4">Bill Payment</h2>
       <form onSubmit={handlePayment} className="space-y-4">
         <input
           type="text"
           placeholder="Account ID"
           value={accountId}
           onChange={(e) => setAccountId(e.target.value)}
           className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         <select
           value={billType}
           onChange={(e) => setBillType(e.target.value)}
           className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
           <option value="">Select Bill Type</option>
           <option value="Electricity">Electricity</option>
           <option value="Water">Water</option>
           <option value="Internet">Internet</option>
         </select>
         <input
           type="number"
           placeholder="Amount"
           value={amount}
           onChange={(e) => setAmount(e.target.value)}
           className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         <button
           type="submit"
           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
           Pay Bill
         </button>
       </form>
       <p className="mt-4 text-green-500">{status}</p>
     </div>
   </div>
 );
}