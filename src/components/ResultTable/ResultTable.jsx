import { useState } from "react";
import Modal from "../Modal/Modal";
import { ResultMounthTable } from "../ResultMounthTable/ResultMounthTable";
import Button from "../Buttons/Buttons";
import s from "./ResultTable.module.css";
export default function ResultTable({ banks }) {
  const [currentBank, setCurrentBank] = useState("Choose");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [resArr, setResArr] = useState([]);
  const [downPay, setDownPay] = useState(0);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState(0);
  const [modal, setModal] = useState(false);
  const changeBank = (e) => {
    setCurrentBank(e.target.value);
    setMax(0);
    setResult(0);
    setDownPay(0);
  };
  const handleResultTable = () => {
    const newArr = [];
    const arr = banks
      .filter((el) => el.name === currentBank)
      .map((el) => {
        let overpayment =
          Number(max) * (+el.category / 100) * (+el.credit / 12); //переплата

        let totalPay = +overpayment + Number(max); //общая сумма с переплатой
        let downPayment = Number(max) * (+el.min / 100); //первоначальный взнос

        if (Number(max) > Number(el.max)) {
          return alert("Initial loan more than max value credit");
        }
        if (Number(min) < Number(downPayment)) {
          return alert(` minimum payment: ${downPayment}`);
        }
        if (Number(min) > Number(max) - 1) {
          return alert(` max payment: ${Number(max) - 1}`);
        }
        let res = (totalPay - Number(min)) / Number(el.credit - 1);
        for (let j = 2; j < +el.credit + 1; j += 1) {
          let val = +j;
          newArr.push(val);
          setResArr(newArr);
        }
        return (
          setResult(res),
          setTotal(totalPay),
          setMax(0),
          setMin(0),
          setDownPay(min)
        );
      });
    setModal(true);
    return arr;
  };
  return (
    <>
      <table className={s.transaction__history}>
        <thead className={s.trans_head}>
          <tr>
            <th>
              <select
                name="bank"
                className={s.sel}
                onChange={changeBank}
                value={currentBank}
              >
                <option key="weq" value={currentBank}>
                  {currentBank}
                </option>
                {banks.map((bank) => {
                  return (
                    <option key={bank.id} id={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  );
                })}
              </select>
            </th>
            {currentBank === "Choose" ? (
              ""
            ) : (
              <>
                <th>Initial loan</th>
                <th>Down payment</th>
              </>
            )}
          </tr>
        </thead>
        {currentBank === "Choose" ? (
          <tbody className="row-list">
            <tr>
              <td>
                <h2>Choose Bank</h2>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="row-list">
            {banks.map((el) => {
              return (
                el.name === currentBank && (
                  <tr key="csdvsdv" className="cell">
                    <td>{el.name}</td>
                    <td>
                      <input
                        type="number"
                        value={max === 0 ? setMax(el.max) : max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        )}
      </table>
      {currentBank === "Choose" ? (
        ""
      ) : (
        <Button type="button" onClick={handleResultTable} children="Result" />
      )}
      {modal && downPay > 0 && (
        <Modal
          onClose={() => {
            setModal(false);
            setDownPay(0);
          }}
        >
          <ResultMounthTable
            downPay={downPay}
            arr={resArr}
            res={result}
            total={total}
          />
        </Modal>
      )}
    </>
  );
}
