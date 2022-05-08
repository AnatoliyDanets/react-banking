import s from "./TableItem.module.css";
export function TableItem({
  id,
  name,
  createDate,
  category,
  max,
  min,
  credit,
  onChange,
  data,
  onDelete,
}) {
  return (
    <>
      <tr id={id}>
        <td>{name}</td>
        <td>{createDate}</td>
        <td>{category}%</td>
        <td>{max}</td>
        <td>{min}%</td>
        <td>{credit}</td>
        <td>
          <div className="wrap-btn">
            <button
              type="button"
              onClick={onChange}
              data-source={data}
              className="edit"
            >
              <svg
                className={s.icon}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#7f8383"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
              </svg>
            </button>
            <button type="submit" onClick={onDelete} className="del">
              <svg
                className={s.icon}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#7f8383"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>bin</title>
                <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
