import React, { useState } from "react";
import "./workflow.css";
import { ArcherContainer, ArcherElement } from "react-archer";

const WorkFlow = () => {
  const col1 = [
    {
      id: "dep1",
      name: "dep1",
      sub: ["fun1", "fun2"],
    },
    {
      id: "dep2",
      name: "dep2",
      sub: ["fun2"],
    },
  ];
  const col2 = [
    {
      id: "fun1",
      name: "fun1",
      sub: ["sub1", "sub2", "sub3"],
      main: ["dep1"],
    },
    {
      id: "fun2",
      name: "fun2",
      sub: ["sub1", "sub4", "sub3"],
      main: ["dep1", "dep2"],
    },
  ];
  const col3 = [
    {
      id: "sub1",
      name: "sub1",
      main: ["dep1", "dep2"],
    },
    {
      id: "sub2",
      name: "sub2",
      main: ["dep1"],
    },
    {
      id: "sub3",
      name: "sub3",
      main: ["dep1", "dep2"],
    },
    {
      id: "sub4",
      name: "sub4",
      main: ["dep1", "dep2"],
    },
    {
      id: "sub5",
      name: "sub5",
    },
  ];
  const [activeBox, setActiveBox] = useState(col1[0]?.id);
  return (
    <div>
      <h2>Workflow</h2>
      <ArcherContainer lineStyle="curve" strokeColor="black">
        <div className="main_container">
          <div className="col1">
            {col1?.map((val) => {
              let relation = [];
              val?.sub?.every((i) =>
                relation.push({
                  targetId: i,
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: { strokeDasharray: "3,3" },
                })
              );
              if (activeBox === val.id) {
                return (
                  <ArcherElement id={val.id} relations={relation}>
                    <div id={val.id} className="activeBox box">
                      {val?.name}
                    </div>
                  </ArcherElement>
                );
              }
              return (
                <div
                  id={val.id}
                  className="box"
                  onClick={() => setActiveBox(val.id)}
                >
                  {val?.name}
                </div>
              );
            })}
          </div>
          <div className="col2">
            {col2?.map((val) => {
              let relation = [];
              val?.sub?.every((i) =>
                relation.push({
                  targetId: i,
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: { strokeDasharray: "3,3" },
                })
              );
              if (val?.main.includes(activeBox)) {
                return (
                  <ArcherElement id={val.id} relations={relation}>
                    <div id={val.id} className="box activeBox">
                      {val?.name}
                    </div>
                  </ArcherElement>
                );
              }
              return (
                <div id={val.id} className="box">
                  {val?.name}
                </div>
              );
            })}
          </div>
          <div className="col3">
            {col3?.map((val) => {
              if (val?.main?.includes(activeBox)) { 
                return (
                  <ArcherElement id={val.id}>
                    <div id={val.id} className="box activeBox">
                      {val?.name}
                    </div>
                  </ArcherElement>
                );
              }
              return (
                <div id={val.id} className="box">
                  {val?.name}
                </div>
              );
            })}
          </div>
        </div>
      </ArcherContainer>
    </div>
  );
};

export default WorkFlow;
