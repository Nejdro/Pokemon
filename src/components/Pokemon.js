import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const Pokemon = ({ id, name, image, type, type2, weight, height }) => {
  const style = `thumb-container ${type}`;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li>Weight:{weight}</li>
          <li>Height:{height}</li>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={style}
        onClick={handleShow}
      >
        <div className="number">
          <small>#0{id}</small>
        </div>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
          <small>Second Type:{type2 ? ` ${type2}` : "--"}</small>
        </div>
      </motion.div>
    </>
  );
};

export default Pokemon;
