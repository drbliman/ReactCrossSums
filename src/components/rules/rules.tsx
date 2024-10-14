import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setVisibilityRules } from "../../utils/slices/visibilityRulesSlice";
import styles from "./rules.module.scss";
import RulesTable_1 from "./rulseTable_1";
import Svg from "../svg/svg";

export default function Rules() {
  const { t } = useTranslation();

  const visibilityRules = useSelector(
    (state: RootState) => state.visibilityRules.visibilityRules,
  );

  const dispatch = useDispatch();

  const handleVisibilityRules = () => {
    dispatch(setVisibilityRules(!visibilityRules));
  };

  return (
    <>
      <div
        className={`${styles.rulse_container} ${visibilityRules === true ? styles.active : ""}`}
      >
        <Svg name="cross" onClick={handleVisibilityRules}></Svg>
        <div className={styles.rulse_title1}>{t("rules")}</div>
        <div className={styles.rulse_hidden}>
          <div className={styles.rulse_title2}>{t("rules_part_1")}</div>
          <RulesTable_1></RulesTable_1>
          <div className={styles.line}></div>
          <div className={styles.rulse_title2}>{t("rules_part_2")}</div>
          <div className={styles.rulse_container_1}>
            <div className={styles.th_none}>1</div>
            <div className={styles.rulse_title2_1}>{t("rules_part_2_1")}</div>
          </div>
          <div className={styles.rulse_container_1}>
            <div className={styles.th_active}>1</div>
            <div className={styles.rulse_title2_1}>{t("rules_part_2_2")}</div>
          </div>
          <div className={styles.rulse_container_1}>
            <div className={styles.th_1}>1</div>
            <div className={styles.rulse_title2_1}>{t("rules_part_2_3")}</div>
          </div>
          <div className={styles.rulse_title2}>{t("rules_part_2_4")}</div>
          <div className={styles.line}></div>
          <div className={styles.rulse_title2}>{t("rules_part_2_5")}</div>
          <div className={styles.rulse_title2}>{t("rules_part_2_6")}</div>
          <div className={styles.table_part_1}>
            <div className={styles.th_one_active}>8</div>
            <div className={`${styles.th_1} ${styles.active}`}>4</div>
            <div className={`${styles.th_none} ${styles.active}`}>2</div>
            <div className={`${styles.th_1} ${styles.active}`}>4</div>
            <div className={`${styles.th_none} ${styles.active}`}>6</div>
          </div>
          <div className={`${styles.table_part_1} ${styles.active}`}>
            <div className={styles.th_one_active}>8</div>
            <div className={`${styles.th_none} ${styles.active}`}>4</div>
            <div className={`${styles.th_1} ${styles.active}`}>2</div>
            <div className={`${styles.th_none} ${styles.active}`}>4</div>
            <div className={`${styles.th_1} ${styles.active}`}>6</div>
          </div>
        </div>
      </div>
    </>
  );
}
