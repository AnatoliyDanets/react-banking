import s from "./Table.module.css";
import { TableItem } from "./TableItem/TableItem";
export default function Table({ banks, onChange }) {

  const baseUrl = `http://localhost:3000/banks`;

  function deleteNote(id) {
    fetch(baseUrl + `/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  return (
    <>
      <table className={s.transaction__history}>
        <thead key="13123" className={s.trans_head}>
          <tr>
            <th>Bank</th>
            <th>Created</th>
            <th>Interest rate %</th>
            <th>Max credit</th>
            <th>Min down payment</th>
            <th>Сredit term</th>
            <th> Edit</th>
          </tr>
        </thead>
        <tbody key="213123" className={s.row}>
          {banks.map((bank) => (
            <TableItem
              key={bank.id}
              id={bank.id}
              name={bank.name}
              createDate={bank.createDate}
              category={bank.category}
              max={bank.max}
              min={bank.min}
              credit={bank.credit}
              onChange={onChange}
              data={bank.id}
              onDelete={() => deleteNote(bank.id)}
            />
          ))}
        </tbody>
      </table>
 
    </>
  );
}
