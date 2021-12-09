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
              return (
                <ArcherElement
                  id={val.id}
                  relations={activeBox?.id === val?.id ? relation : []}
                >
                  <div
                    id={val.id}
                    className={`department_card cardDiv ${
                      activeBox?.id === val?.id ? "activeBox" : "inactiveBox"
                    }`}
                    onClick={() =>
                      activeBox?.id === val?.id ? null : setActiveBox(val)
                    }
                  >
                    <span className="label">Department</span>
                    <span className="action_dot">&#8942;</span>
                    <span className="name">{val?.name}</span>
                  </div>
                </ArcherElement>
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
              let nowFunc = [];
              activeBox?.flow?.map((d) => {
                nowFunc.push(d?.func);
              });
              return (
                <ArcherElement
                  id={val.id}
                  relations={nowFunc?.includes(val?.id) ? relation : []}
                >
                  <div
                    id={val.id}
                    className={`cardDiv function_card ${
                      nowFunc?.includes(val?.id) ? "activeBox" : "inactiveBox"
                    }`}
                  >
                    <span className="label">Function</span>
                    <span className="action_dot">&#8942;</span>
                    <span className="name">{val?.name}</span>
                  </div>
                </ArcherElement>
              );
            })}
          </div>
          <div className="subFunc">
            {subFunc?.map((val) => {
               let nowFunc = [];
               activeBox?.flow?.map((d) => {
                 d?.subFunc?.map(i =>{
                  nowFunc.push(i);
                 })
               });
              return (
                <ArcherElement id={val.id}>
                  <div id={val.id} className={`cardDiv subFunc_card ${nowFunc?.includes(val?.id) ? 'activeBox' : 'inactiveBox'}`}>
                    <span className="label">Function</span>
                    <span className="action_dot">&#8942;</span>
                    <span className="name">{val?.name}</span>
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
