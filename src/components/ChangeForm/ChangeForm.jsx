import { useState } from "react";
import Button from "../Buttons/Buttons";
import s from "./CreateBankForm.module.css";

export default function ChangeForm({ onSave, oneBank }) {
  // const [bank,setBank]=useState([])
  const [name, setName] = useState('');
  const [category, setCategory] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [credit, setCredit] = useState("");
  // useEffect(()=>setBank(oneBank),[oneBank])
  console.log(oneBank.name);
  console.log(name);
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "max":
        setMax(value);
        break;
      case "min":
        setMin(value);
        break;
      case "credit":
        setCredit(value);
        break;
      default:
        break;
    }
  };

  async function changeNote(bankId, data) {
    try {
      const response = await fetch(`http://localhost:3000/banks/${bankId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Успех:", JSON.stringify(json));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const handleSubmit = (e) => {
    e.preventDefault();
    const bank = {
      name,
      createDate: today.toDateString(),
      category,
      max,
      min,
      credit,
    };
    changeNote(oneBank.id, bank);
    onSave();
  };

  return (
    <form className={s.modalForm} onSubmit={handleSubmit}>
      <label className={s.label}>Bank Name</label>
      <input
        type="text"
        name="name"
        id="name"
        defaultValue={oneBank.name}
        value={name}
        onChange={handleChange}
        className={s.inputForm}
        required
      />

      <label className={s.label}>Category</label>

      <select
        name="category"
        value={category}
        onChange={handleChange}
        className={s.selectForm}
      >
        <option value="Choose">Choose</option>
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="25">25%</option>
        <option value="30">30%</option>
      </select>

      <label className={s.label}>Max</label>

      <input
        type="number"
        name="max"
        id="max"
        value={max}
        onChange={handleChange}
        className={s.inputForm}
        required
      />

      <label className={s.label}>Down payment %</label>

      <select
        name="min"
        className={s.selectForm}
        value={min}
        onChange={handleChange}
      >
        <option value="Choose">Choose</option>
        <option value="10">10%</option>
        <option value="10">20%</option>
        <option value="30">30%</option>
        <option value="40">40%</option>
      </select>

      <label className={s.label}>Credit Term</label>

      <select
        name="credit"
        value={credit}
        className={s.selectForm}
        onChange={handleChange}
      >
        <option value="Choose">Choose</option>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>

      <Button type={"submit"} children={"Change Bank"} />
    </form>
  );
}
