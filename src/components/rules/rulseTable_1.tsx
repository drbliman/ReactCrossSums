import styles from "./rules.module.scss";

export default function RulesTable_1() {
  return (
    <>
      <div className={styles.table_part_1}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className={styles.th_one}>11</th>
              <th className={styles.th_one}>10</th>
              <th className={styles.th_one}>9</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.th_one}>5</th>
              <th className={styles.th_none}>1</th>
              <th className={styles.th}>2</th>
              <th className={styles.th}>3</th>
            </tr>
            <tr>
              <th className={styles.th_one}>10</th>
              <th className={styles.th}>4</th>
              <th className={styles.th_none}>5</th>
              <th className={styles.th}>6</th>
            </tr>
            <tr>
              <th className={styles.th_one}>15</th>
              <th className={styles.th}>7</th>
              <th className={styles.th}>8</th>
              <th className={styles.th_none}>9</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
