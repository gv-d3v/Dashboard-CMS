import React from "react";

export default function ProjectTracker({ progress, setProgress, stage1pass, edit }) {
  return (
    <div className="progress-tracker">
      <div
        className={`bullet ${progress ? "active" : ""}`}
        onClick={() => setProgress(1)}
      >
        <span className={`bullet1span ${progress === 1 ? "active" : ""}`}>Basic Info</span>
      </div>
      <div className={`connector ${progress === 2 || progress === 3 ? "active" : ""}`}></div>
      <div
        className={`bullet ${progress === 2 || progress === 3 ? "active" : ""}`}
        onClick={() => (stage1pass || edit) && setProgress(2)}
      >
        <span className={`bullet2span ${progress === 2 ? "active" : ""}`}>Additional Info</span>
      </div>
      <div className={`connector ${progress === 3 ? "active" : ""}`}></div>
      <div
        className={`bullet ${progress === 3 ? "active" : ""}`}
        onClick={() => (stage1pass || edit) && setProgress(3)}
      >
        <span className={`bullet3span ${progress === 3 ? "active" : ""}`}>Images</span>
      </div>
    </div>
  );
}
