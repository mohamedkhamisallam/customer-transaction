// Import necessary modules

import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
//
//  receives data as a prop from App component
const Charts = ({ data }) => {
  let allData=


{
    "customers": [
    {
    "id": 1,
    "name": "Ahmed Ali"
    },
    {
    "id": 2,
    "name": "Aya Elsayed"
    },
    {
        "id": 3,
        "name": "Mina Adel"
        },
        {
        "id": 4,
        "name": "Sarah Reda"
        },
        {
        "id": 5,
        "name": "Mohamed Sayed"
        }
        ],
        "transactions": [
        {
        "id": 1,
        "customer_id": 1,
        "date": "2022-01-01",
        "amount": 1000
        },
        {
        "id": 2,
        "customer_id": 1,
        "date": "2022-01-02",
        "amount": 2000
        },
        {
        "id": 3,
        "customer_id": 2,
        "date": "2022-01-01",
        "amount": 550
        },
        {
        "id": 4,
        "customer_id": 3,
        "date": "2022-01-01",
        "amount": 500
        },
        {
        "id": 5,
        
        "customer_id": 2,
        "date": "2022-01-02",
        "amount": 1300
        },
        {
        "id": 6,
        "customer_id": 4,
        "date": "2022-01-01",
        "amount": 750
        },
        {
        "id": 7,
        "customer_id": 3,
        "date": "2022-01-02",
        "amount": 1250
        },
        {
        "id": 8,
        "customer_id": 5,
        "date": "2022-01-01",
        "amount": 2500
        },
        {
        "id": 9,
        "customer_id": 5,
        "date": "2022-01-02",
        "amount": 875}
        ]
    }
  const [customer, setCustomer] = useState([]);
  const [transaction, setTransaction] = useState([]);

  // Function to fetch customer data
  let fetchCustomer = async () => {
    // let response = await axios.get("http://localhost:3000/customers");
    setCustomer(allData.customers); // Set the fetched customer data to the state
  };

  // useEffect hook to fetch customer data when the component mounts
  useEffect(() => {
    fetchCustomer();
  }, []);

  // Function to fetch transaction data from the server
  let fetchTransaction = async () => {
    // let response = await axios.get("http://localhost:3000/customers");
    setTransaction(allData.transactions); // Set the fetched transaction data to the state
  };

  // useEffect hook to fetch transaction data when the component mounts
  useEffect(() => {
    fetchTransaction();
  }, []);

  // Combine customer data with their  transactions
  let customerTransaction = customer.map((customer) => {
    let transactions = transaction.filter((transaction) => {
      return transaction.customer_id === customer.id;
    });

    return {
      ...customer,
      transactions,
    };
  });

  // Flatten the combined data
  const flattenedTransactions = data.flatMap((customer) =>
    customer.transactions.map((transaction) => ({
      name: customer.name,
      date: transaction.date,
      amount: transaction.amount,
    }))
  );

  return (
    <>
      {/* Responsive container for the LineChart */}
      <ResponsiveContainer width={500} height={300}>
        <LineChart
          width={400}
          height={300}
          data={flattenedTransactions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          {/* X-Axis */}
          <XAxis dataKey="name" color="red" tick={{ fill: "white" }} />
          {/* Y-Axis */}
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Legend />
          {/* Line  to draw the data */}
          <Line dataKey="amount" stroke="#8884d8" type="monotone" fill="red" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;
