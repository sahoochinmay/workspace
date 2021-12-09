import React, { useState } from "react";
import "./workflow.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import { v4 as uuidv4 } from "uuid";
import NewAddModal from "./NewAddModal";
import ConnectFunctionModal from "./ConnectFunctionModal";
import ConnectSubFunctionModal from "./ConnectSubFunctionModal"
import DotPopover from "./DotPopover";
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
      flow: [],
    },
    {
      id: "dep4",
      name: "dep4",
      flow: [],
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
  const [addNewModa, setAddNewModal] = useState(false);
  const [connectFunctionModal, setConnectFunctionModal] = useState({
    id: null,
    state: false,
  });
  const [connectSubFunctionModal, setConnectSubFunctionModal] = useState({
    id: null,
    state: false,
  });
  const handleAddCard = (id, data) => {
    switch (id) {
      case "department":
        let tempDep = [
          ...dept,
          {
            id: uuidv4(),
            name: data,
            flow: [],
          },
        ];
        setDept([...tempDep]);
        break;
      case "function":
        let tempFunc = [
          ...func,
          {
            id: uuidv4(),
            name: data
          },
        ];
        setFunc([...tempFunc]);
        break;
      case "subfunction":
        let tempSubFunc = [
          ...subFunc,
          {
            id: uuidv4(),
            name: data
          },
        ];
        setSubFunc([...tempSubFunc]);
        break;
      default:
        break;
    }
  };
  const handleConnectFunction = (id, data) => {
    let tempDept = [...dept];
    let objIndex = tempDept.findIndex((obj) => obj.id === id);
    tempDept[objIndex]?.flow?.push({
      func: data,
      subFunc:[]
    });
    setDept([...tempDept]);
  };
  const handleDeleteDept = (id) =>{
    let tempDept = [...dept];
    let  objIndex = tempDept.findIndex((obj => obj.id === id));
    tempDept.splice(objIndex, 1);
    setDept([...tempDept])
    let tempFunc = [...func]
    setFunc([...tempFunc])
  }
  const handleConnectSubFunction = (id,funId,data) =>{
    let tempDept = [...dept];
    let  objIndex = tempDept.findIndex((obj => obj.id === id));
    tempDept[objIndex]?.flow?.map((i) =>{
      if(i?.func === funId)
      {
        let  funIndx = tempDept[objIndex]?.flow?.findIndex((obj => obj.func === funId));
        tempDept[objIndex]?.flow[funIndx]?.subFunc?.push(data)
      }
    })
  }
  return (
    <div>
      <NewAddModal
        isOpen={addNewModa}
        handleClose={() => setAddNewModal(false)}
        handleAddCard={(id, data) => handleAddCard(id, data)}
      />
      <ConnectFunctionModal
        isOpen={connectFunctionModal?.state}
        handleClose={() =>
          setConnectFunctionModal({
            id: null,
            state: false,
          })
        }
        handleConnectFunction={(id, data) => handleConnectFunction(id, data)}
        func={func}
        dept={dept}
        depId={connectFunctionModal?.id}
      />
      <ConnectSubFunctionModal 
       isOpen={connectSubFunctionModal?.state}
       handleClose={() =>
         setConnectSubFunctionModal({
           id: null,
           state: false,
         })
       }
       handleConnectFunction={(id,funId, data) => handleConnectSubFunction(id,funId, data)}
       subFunc={subFunc}
       dept={dept}
       funId={connectSubFunctionModal?.id}
       depId={activeBox?.id}
      />
      <h2>Workflow</h2>
      <button onClick={() => setAddNewModal(true)}>+ Add New</button>
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
              let state = activeBox?.id === val?.id;
              return (
                <ArcherElement id={val.id} relations={state ? relation : []}>
                  <div
                    id={val.id}
                    className={`department_card cardDiv ${
                      state ? "activeBox" : "inactiveBox"
                    }`}
                    onClick={() => (state ? null : setActiveBox(val))}
                  >
                    <span className="label">Department</span>
                    <DotPopover state={state} handleDeleteDept={() =>handleDeleteDept(val?.id)} />
                    <span className="name">{val?.name}</span>
                    <span
                      className="addIcon"
                      onClick={() =>
                        state
                          ? setConnectFunctionModal({
                              id: val?.id,
                              state: true,
                            })
                          : null
                      }
                    >
                      +
                    </span>
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
              let state = nowFunc?.includes(val?.id)
              return (
                <ArcherElement
                  id={val.id}
                  relations={state ? relation : []}
                >
                  <div
                    id={val.id}
                    className={`cardDiv function_card ${
                      state ? "activeBox" : "inactiveBox"
                    }`}
                  >
                    <span className="label">Function</span>
                    <DotPopover state={state} handleDeleteDept={() =>null} />
                    <span className="name">{val?.name}</span>
                    <span
                      className="addIcon"
                      onClick={() =>
                        state
                          ? setConnectSubFunctionModal({
                              id: val?.id,
                              state: true,
                            })
                          : null
                      }
                    >
                      +
                    </span>
                  </div>
                </ArcherElement>
              );
            })}
          </div>
          <div className="subFunc">
            {subFunc?.map((val) => {
              let nowFunc = [];
              activeBox?.flow?.map((d) => {
                d?.subFunc?.map((i) => {
                  nowFunc.push(i);
                });
              });
              return (
                <ArcherElement id={val.id}>
                  <div
                    id={val.id}
                    className={`cardDiv subFunc_card ${
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
        </div>
      </ArcherContainer>
    </div>
  );
};

export default WorkFlow;
