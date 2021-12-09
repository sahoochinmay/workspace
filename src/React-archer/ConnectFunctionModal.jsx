import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConnectFunctionModal = ({ isOpen, handleClose, handleConnectFunction , func ,depId ,dept }) => {
    const classes = useStyles();
    const [section,setSection] = useState()
    const [funcFinal,setFuncFinal] = useState([])
    useEffect(() => {
        let tempDept = [...dept];
    let  objIndex = tempDept.findIndex((obj => obj.id === depId));
    let listFunc = [];
    tempDept[objIndex]?.flow?.map(d =>{
      listFunc.push(d?.func)
    })
    let funcs = [...func]
    for(var i =0; i < listFunc?.length ; i++)
    {
        for(var j = 0; j < funcs?.length ;j++)
        {
            if (listFunc[i] === funcs[j].id) {
                funcs.splice(j, 1);
                break;
            }
        }
    }
    setFuncFinal([...funcs])
    }, [isOpen])
    const handleSubmit = () =>{
        handleConnectFunction(depId,section)
        handleClose();
    }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">Connect Function</h4>
            <section>
              <label htmlFor="">Section</label>&nbsp;&nbsp;
              <select
                name="cars"
                id="cars"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                  <option value="" >Choose</option>
                  {
                      funcFinal?.map(val => <option value={val?.id}>{val?.name}</option>)
                  }
              </select>
            </section>
            <br />
            <br />
            <span onClick={() => handleSubmit()}>Submit</span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConnectFunctionModal;
