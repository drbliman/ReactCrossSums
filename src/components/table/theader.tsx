import styles from "./table.module.scss";

export default function Thead({ numbers }: TheadProps) {
  return (
    <>
      <thead>
        <tr>
          <th></th>
          {numbers.map((elem, index) => (
            <th className={styles.th_one} key={`${index}_${elem}`}>
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
