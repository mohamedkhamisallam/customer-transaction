// Import necessary modules

import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Charts from "./Charts";
///

function App() {
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
  const [customer, setcustomer] = useState([]);
  const [transaction, settransaction] = useState([]);
  const [search, setsearch] = useState("");
  const [search_amount, setsearch_amount] = useState(0);

  console.log(search);
  

  // Function to fetch customer data
  let fetchData =  () => {
    // let response = await axios.get("http://localhost:3000/customers");
     setcustomer(allData.customers); // Set the fetched customer data to the state
  };
  // useEffect hook to fetch customer data
  useEffect(() => {
    fetchData();
  }, []);
  console.log(customer);

  // useEffect hook to fetch transaction data
  useEffect(() => {
    let fetchData = async () => {
      // let response = await axios.get("http://localhost:3000/customers");
      settransaction(allData.transactions); // Set the fetched transaction data to the state
    };

    fetchData();
  }, []);

  // Combine customer data with the transactions
  let customerTransactions = customer.map((customer) => {
    let transactions = transaction.filter(
      (transaction) => transaction.customer_id === customer.id
    );
    return {
      ...customer,
      transactions,
    };
  });

  // Filter combined data
  let filterTransactions = customerTransactions.filter((ele) => {
    if (search.toLowerCase() === "" && search_amount === 0) {
      return ele;
    } else if (search.toLowerCase().length > 0 && search_amount === 0) {
      return ele.name.toLowerCase().includes(search.toLowerCase());
    } else if (search_amount > 0 && search.toLowerCase() === "") {
      return ele.transactions.some((ele) =>
        ele.amount.toString().includes(search_amount.toString())
      );
    } else {
      return (
        ele.name.toLowerCase().includes(search.toLowerCase()) &&
        ele.transactions.some((ele) =>
          ele.amount.toString().includes(search_amount.toString())
        )
      );
    }
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-ms-12 text-center mt-4">
            <h1>CUSTOMER TRANSACTION</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex p-4 justify-content-center align-items-center w-70 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            className="w-100 m-2"
            onChange={(e) => setsearch(e.target.value)} // Update search state on input change
          />
          <input
            type="number"
            name="amount"
            placeholder="Search by amount"
            className="w-100 m-2"
            onChange={(e) => setsearch_amount(e.target.value)} // Update search_amount state on input change
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 bg-black text-white text-center p-2">
              <table>
                <thead>
                  <tr>
                    <th className="border border-primary">Customer Name</th>
                    <th className="border border-primary">Transaction Date</th>
                    <th className="border border-primary">
                      Transaction Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterTransactions.map((customer) => {
                    return (
                      <>
                        <tr key={customer.id} className="border border-primary">
                          <td rowSpan={customer.transactions.length + 1}>
                            {customer.name}
                          </td>
                        </tr>
                        {customer.transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-6 bg-black text-white p-2">
              <Charts data={filterTransactions} />{" "}
              {/* Render Charts component */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
