import React, {useState} from "react";
import { Card, CardTitle, CardImg, CardBody, Button, Modal, CardSubtitle, CardText, CardGroup, Row, Col} from "reactstrap";
import "./App.css";


const Cards = ({thumbnail, title, categories, description, authors, publisher}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(<div>
        
          <Row><Col sm="10">
        <CardGroup>
     <Card style={{width: "200px", padding: "10px"}}>
        <CardImg top style={{width: "128px", height: "180px", display: "block", margin: "0 auto"}} 
        src={thumbnail} alt={title}/>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardBody>
            
            <CardSubtitle style={{color: "gray"}}>{categories}</CardSubtitle>
            <CardText style={{marginTop: "10px"}}>Author: {authors}</CardText>

            <Button onClick={toggle}>More info</Button>
        </CardBody>
        
        <Modal isOpen={modal} toggle={toggle}><div className="modal-header d-flex justify-content-between ml-3">
            <h5 className="modal-title text-center" id="exampleModalLabel">{title}</h5><div style={{float: "right"}}>
                <button aria-label="Close" className="close" type="button" onClick={toggle}>Close</button></div>
            </div>
                <div className="modal-body"><div className="d flex justify-content-around">
                    <img src={thumbnail} alt={title} />
                    <div>
                        
                        <p>Authors: {authors}</p>
                        <p>Publisher: {publisher}</p>
                    </div></div>
                    <div className="mt-3">{description}</div>
                    </div>
                    </Modal>
    </Card></CardGroup></Col></Row></div>
   )
}

export default Cards;