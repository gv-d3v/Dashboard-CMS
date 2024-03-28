import React from "react";

export default function Loading({ ml, mt }) {
  return (
    <div
      style={{
        marginLeft: ml ? ml : undefined,
        marginTop: mt ? mt : undefined,
      }}
      className={`lds-spinner`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
