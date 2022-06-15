import { useState, useEffect } from "react";

const CatFacts = (props) => {
  const [facts, setFacts] = useState(undefined);
  const [currentFact, setCurrentFact] = useState(0);

  const getCatFacts = async () => {
    const response = await fetch("https://cat-fact.herokuapp.com/facts");
    const data = await response.json();
    return data;
  };

  const nextClick = () => {
    let nextFact = currentFact + 1;
    if (nextFact > facts.length - 1) {
      nextFact = 0;
    }

    setCurrentFact(nextFact % facts.length);
  };

  const prevClick = () => {
    let nextFact = currentFact - 1;
    if (nextFact < 0) {
      nextFact = facts.length - 1;
    }

    setCurrentFact(nextFact);
  };

  useEffect(() => {
    getCatFacts().then((data) => {
      setFacts(data.map((item) => item.text));
    });
  }, []);

  return (
    <>
      {facts && <p>{facts[currentFact]} </p>}
      <button onClick={nextClick}>Next</button>
      <button onClick={prevClick}>Prev</button>
    </>
  );
};

export default CatFacts;
