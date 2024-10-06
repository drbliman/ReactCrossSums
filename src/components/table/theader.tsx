import styles from "./table.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Thead({ numbers }: TheadProps) {
  const thColumnFirst = useSelector((state: RootState) => state.thead);

  return (
    <>
      <thead>
        <tr>
          <th></th>
          {numbers.map((elem, index) => (
            <th
              className={`${styles.th_one} ${thColumnFirst.thead[index] ? styles.active : ""}`}
              key={`${index}_${elem}`}
            >
              {elem}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

interface TheadProps {
  numbers: number[];
}
