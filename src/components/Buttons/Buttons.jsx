import s from './Button.module.css'

export default function Button({ type, onClick, children }) {
  return (
    <button type={type} onClick={onClick} className={s.btn}>
      {children}
    </button>
  );
}
