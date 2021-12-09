import React, { useState } from "react";
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

const NewAddModal = ({ isOpen, handleClose, handleAddCard }) => {
  const classes = useStyles();
  const [section,setSection] = useState('department')
  const [name,setName] = useState("")
  const handleSubmit = () => {
      handleAddCard(section,name)
      handleClose()
  };
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
            <h4 id="transition-modal-title">Add Card</h4>
            <section>
              <label htmlFor="">Section</label>&nbsp;&nbsp;
              <select name="cars" id="cars" value={section} onChange={(e) =>setSection(e.target.value)} >
                <option value="department">department</option>
                <option value="function">Function</option>
                <option value="subfunction">Sub-Function</option>
              </select>
            </section>
            <br />
            <section>
                <label htmlFor="">Name</label>&nbsp;&nbsp;
                <input value={name} onChange={(e) =>setName(e.target.value)} />
            </section>
            <br />
            <br />
            <span onClick={() =>handleSubmit()} >Submit</span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewAddModal;
