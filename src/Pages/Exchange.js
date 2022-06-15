import { useState, useEffect } from "react";

const Exchange = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [conversions, setConverstions] = useState({});
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [currentAmount, setCurrentAmount] = useState(1);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://v6.exchangerate-api.com/v6/2b4a22f2934a0dc9f5c28854/latest/USD"
      );

      const data = await response.json();
      setConverstions(data.conversion_rates);

      const ratesArray = Object.keys(data.conversion_rates);

      setCurrencies(ratesArray);
      return data;
    };

    fetchData();
  }, []);

  useEffect(() => {
    const rate = conversions[currentCurrency];
    setResult(currentAmount / rate);
  }, [currentCurrency, currentAmount, conversions]);

  const changeCurrency = (event) => {
    const value = event.target.value;
    setCurrentCurrency(value);
  };

  const changeAmount = (event) => {
    const value = event.target.value;
    setCurrentAmount(value);
  };

  return (
    <>
      <p>Exchange Component</p>
      <select onChange={changeCurrency} value={currentCurrency}>
        {currencies.map((item) => (
          <option>{item}</option>
        ))}
      </select>

      <div>
        <input
          onChange={changeAmount}
          type="number"
          value={currentAmount}
        ></input>
      </div>
      <p>{result}</p>
    </>
  );
};

export default Exchange;
