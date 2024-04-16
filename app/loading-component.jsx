import React from "react";

export default function LoadingComponent({ ml, mt }) {
  return (
    <div
      style={{
        marginLeft: ml ? ml : undefined,
        marginTop: mt ? mt : undefined,
      }}
      className={`lds-spinner2`}
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
