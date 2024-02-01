// CurrencyConverter.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [exchangeRate, setExchangeRate] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(' USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apikey = `3fdf3a9176474958b577b3b6`;
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRate(response.data.conversion_rates);
      })
      .catch((error) => {
        console.error("fetching error", error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRates = exchangeRate[toCurrency];
    if (conversionRates) {
      const converted = amount * conversionRates;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, toCurrency, fromCurrency, exchangeRate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "amount":
        setAmount(value);
        break;

      case "fromCurrency":
        setFromCurrency(value);
        break;

      case "toCurrency":
        setToCurrency(value);
        break;
    }
  };

  return (
    <div className="card">
      <h1 className="text-6xl">Currency Converter</h1>

      <div className="currency_exchnage">
        {/* input 1 */}

        <div className="input_container">
          <label className="input_label">Amount:</label>
          <input
            type="number"
            name="amount"
            className="input_field"
            value={amount}
            onChange={handleChange}
          />
        </div>

        {/* input 2 */}

        <div className="input_container">
          <label className="input_label">From Currency:</label>
          <select
            name="fromCurrency"
            className="input_field"
            value={fromCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* input 3 */}

        <div className="input_container">
          <label className="input_label">To Currency:</label>
          <select
            name="toCurrency"
            className="input_field"
            value={toCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* button which is convert currency */}
      <div className="output">
        <h2>Converted Amount:{convertedAmount}</h2>
      </div>
    </div>
  );
};

export default App;
