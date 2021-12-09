import React, { useState } from "react";
import "./workflow.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import { v4 as uuidv4 } from "uuid";

const WorkFlow = () => {
  const [dept, setDept] = useState([
    {
      id: "dep1",
      name: "dep1",
      flow: [
        {
          func: "fun1",
          subFunc: ["sub1"],
        },
        {
          func: "fun2",
          subFunc: ["sub3", "sub4"],
        },
      ],
    },
    {
      id: "dep2",
      name: "dep2",
      flow: [
        {
          func: "fun1",
          subFunc: ["sub4"],
        },
        {
          func: "fun2",
          subFunc: ["sub2"],
        },
      ],
    },
    {
      id: "dep3",
      name: "dep3",
    },
    {
      id: "dep4",
      name: "dep4",
    },
  ]);
  const [func, setFunc] = useState([
    {
      id: "fun1",
      name: "fun1",
    },
    {
      id: "fun2",
      name: "fun2",
    },
    {
      id: "fun3",
      name: "fun3",
    },
    {
      id: "fun4",
      name: "fun4",
    },
  ]);
  const [subFunc, setSubFunc] = useState([
    {
      id: "sub1",
      name: "sub1",
    },
    {
      id: "sub2",
      name: "sub2",
    },
    {
      id: "sub3",
      name: "sub3",
    },
    {
      id: "sub4",
      name: "sub4",
    },
  ]);
  const [activeBox, setActiveBox] = useState(dept[0]);
  return (
    <div>
      <h2>Workflow</h2>
      <ArcherContainer lineStyle="curve" strokeColor="black">
        <div className="workflow_container">
          <div className="department">
            {dept?.map((val) => {
              let relation = [];
              val?.flow?.map((i) =>
                relation.push({
                  targetId: i?.func,
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: {
                    strokeDasharray: "3,3",
                  },
                })
              );
              if (activeBox === val) {
                return (
                  <ArcherElement id={val.id} relations={relation}>
                    <div id={val.id} className="activeBox department_card box">
                      <span className="label">Department</span>
                    </div>
                  </ArcherElement>
                );
              }
              return (
                <div
                  id={val.id}
                  className="box"
                  onClick={() => setActiveBox(val)}
                >
                  {val?.name}
                </div>
              );
            })}
          </div>
          <div className="func">
            {func?.map((val) => {
              let result = [];
              activeBox?.flow?.map((d) => {
                if (d?.func === val?.id) {
                  d?.subFunc?.map((i) => result?.push(i));
                }
              });
              let relation = [];
              result?.map((i) =>
                relation.push({
                  targetId: i,
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: {
                    strokeDasharray: "3,3",
                  },
                })
              );
              return (
                <ArcherElement id={val.id} relations={relation}>
                  <div id={val.id} className="box activeBox">
                    {val?.name}
                  </div>
                </ArcherElement>
              );
            })}
          </div>
          <div className="subFunc">
            {subFunc?.map((val) => {
              return (
                <ArcherElement id={val.id}>
                  <div id={val.id} className="box activeBox">
                    {val?.name}
                  </div>
                </ArcherElement>
              );
            })}
          </div>
        </div>
      </ArcherContainer>
    </div>
  );
};

export default WorkFlow;
