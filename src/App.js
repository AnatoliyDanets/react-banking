import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Buttons/Buttons";
import ChangeForm from "./components/ChangeForm/ChangeForm";
import CreateBankForm from "./components/CreateBankForm/CreateBankForm";
import Modal from "./components/Modal/Modal";
import Table from "./components/Table/Table";
import ResultTable from "./components/ResultTable/ResultTable";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bankOne, setBankOne] = useState({});
  const [modal, setModal] = useState(false);
  const [modalChange, setModalChange] = useState(false);

  const toggleModal = () => setModal((state) => !state);
  const toggleChangeModal = (e) => {
    console.log(e.target);
    const id = e.target.dataset.source;
    if (e.target.dataset) {
      setModalChange(true);

      getId(id);
    }
  };
  const baseUrl = `http://localhost:3000/banks`;
  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBanks(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [banks, baseUrl]);

  async function getId(bankId) {
    const res = await fetch(`http://localhost:3000/banks/${bankId}`);
    const bank = await res.json();
    console.log(bank);
    return setBankOne(bank);
  }

  async function createNote(data) {
    let response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    return result;
  }
  const addBank = ({ name, createDate, category, max, min, credit }) => {
    const bank = {
      name,
      createDate,
      category,
      max,
      min,
      credit,
    };
    createNote(bank);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {banks.length > 0 ? (
          <Table banks={banks} onChange={toggleChangeModal} />
        ) : (
          <h1>Not Banks</h1>
        )}
        <Button
          type={"button"}
          onClick={toggleModal}
          children={"Create Bank"}
        />
        {banks.length > 0 && <ResultTable banks={banks} />}

        {modal && (
          <Modal onClose={toggleModal}>
            <CreateBankForm onSubmit={addBank} onSave={toggleModal} />
          </Modal>
        )}
        {modalChange && (
          <Modal onClose={() => setModalChange((prev) => !prev)}>
            <ChangeForm
              onSave={() => setModalChange(false)}
              oneBank={bankOne}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
