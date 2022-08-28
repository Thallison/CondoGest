import React from "react";
import Grid from "../template/Grid";

export default (props) => {
  return (
    <Grid cols="12 12 12 6">
      <div className={`small-box bg-${props.color}`}>
        <div className="inner">
          <h2>{props.text}</h2>
          {props.subtext ? <h4 className="sub-title">{props.subtext}</h4> : ""}
          {props.amount instanceof Array ? props.amount.map(t => <p className="mb-0">{t}</p>) : <p>{props.amount}</p> }
        </div>
        <div className="icon">
          <i className={`fas fa-${props.icon}`}></i>
        </div>
      </div>
    </Grid>
  );
};