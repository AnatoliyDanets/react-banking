import s from "./ResultMounthTable.module.css";
export function ResultMounthTable({ downPay, arr, res,total }) {
  return (
    <div className={s.wrap}>
      <table className={s.table}>
        <thead className={s.trans_head}>
          <tr>
            <th>Mounth</th>
            <th>Monthly payment</th>
          </tr>
        </thead>

        <tbody className={s.row}>
          <tr key={"casc2234asc"} className="cell">
            <td>1 mounth</td>
            <td>{downPay}</td>
          </tr>
          {arr.map((el, i) => {
            return (
              <tr key={i} className="cell">
                <td>{el} mounth</td>
                <td>{res.toFixed(2)}</td>
              </tr>
            );
          })}
           <tr key={"cascasc"} >
            <td className={s.total}>Total pay</td>
            <td className={s.total}>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
