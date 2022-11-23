import React from "react";
import styles from "./styles/RevenueGraph.module.scss";

const RevenueGraph: React.FC<{ budget: number; revenue: number }> = (props) => {
  const budget: number = props.budget;
  const revenue: number = props.revenue;
  let greaterValue: "budget" | "revenue" = "budget";
  let relativeFillPercentage = 0;

  if (budget > revenue) {
    greaterValue = "budget";
    relativeFillPercentage = (revenue / budget) * 70;
  } else {
    greaterValue = "revenue";
    relativeFillPercentage = (budget / revenue) * 70;
  }

  // let graphTheme =
  //   greaterValue === "budget"
  //     ? `${styles["revenue-graph"]} ${styles["red"]}`
  //     : `${styles["revenue-graph"]} ${styles["blue"]}`;


  let graphTheme = `${styles["revenue-graph"]} ${styles["blue"]}`

  const SimplifyRevenueFormat = (revenueValue: number): string => {
    let formattedValue = revenueValue.toString();
    let formattedValueString = `${formattedValue} $`;

    if (revenueValue > Math.pow(10, 5) && revenueValue < Math.pow(10, 6)) {
      formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(
        3,
        6
      )}`;
      formattedValueString = `${formattedValue} $`;
    }

    if (revenueValue > Math.pow(10, 6) && revenueValue < Math.pow(10, 9)) {
      const indexToCutTo = formattedValue.length - 6;
      formattedValue = formattedValue.slice(0, indexToCutTo);
      formattedValueString = `${formattedValue} mil. $`;
    }

    if (revenueValue > Math.pow(10, 9)) {
      const billions = formattedValue.slice(0, formattedValue.length - 9)
      const millions = formattedValue.slice(1, formattedValue.length - 8)
      formattedValueString = `${billions}.${millions} bil. $`;
    }

    return formattedValueString;
  };

  const formattedRevenue = SimplifyRevenueFormat(props.revenue);
  const formattedBudget = SimplifyRevenueFormat(props.budget);

  return (
    <div className={graphTheme}>
      <header className={styles["revenue-graph__header"]}>
        <h2>Movie's Revenue</h2>
      </header>
      <div className={styles["graph__budget"]}>
        <span>Budget</span>
        {props.budget !== 0 && props.budget !== null ? (
          <div className={styles["budget-bar"]}>
            <div
              style={
                greaterValue === "budget"
                  ? { width: `${70}%` }
                  : { width: `${relativeFillPercentage}%` }
              }
              className={styles["budget-bar__fill"]}
            ></div>
            <span>{formattedBudget}</span>
          </div>
        ) : (
          <span className={styles["graph-bar__fallback"]}>
            No information about budget
          </span>
        )}
      </div>
      <div className={styles["graph__revenue"]}>
        <span>Revenue</span>
        {props.revenue !== 0 && props.revenue !== null ? (
          <div className={styles["revenue-bar"]}>
            <div
              style={
                greaterValue === "revenue"
                  ? { width: `${70}%` }
                  : { width: `${relativeFillPercentage}%` }
              }
              className={styles["revenue-bar__fill"]}
            ></div>
            <span>{formattedRevenue}</span>
          </div>
        ) : (
          <span className={styles["graph-bar__fallback"]}>
            No information about revenue
          </span>
        )}
      </div>
    </div>
  );
};

export default RevenueGraph;
