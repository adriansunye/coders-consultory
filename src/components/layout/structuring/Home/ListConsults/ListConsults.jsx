import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap'
import { BiUserCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import OptionsPopover from "./OptionsPopover";

export default function ListUser() {
    const [consults, setConsults] = useState([]);
    const [anchorEl, setAnchorEl] = useState();
    const [destination, setDestination] = useState();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getConsults();
    }, []);
    function getConsults() {
        axios.get('http://localhost:8888/coders-consultory-server/api/users/').then(function (response) {
            console.log(response.data);
            setConsults(response.data);
        });
    }
    const deleteConsult = (id) => {
        axios.delete(`http://localhost:8888/coders-consultory-server/api/user/${id}/delete`).then(function (response) {
            console.log(response.data);
            getConsults();
        });
    }
    const handleClick = (event) => {
        setDestination(event.currentTarget.name)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {consults.map((consult, key) =>
                <Container key={key} className="mt-3 border rounded p-3">
                    <Row>
                        <Col>
                            {consult.user}
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button name={consult.id} aria-describedby={id} variant="contained" onClick={handleClick} >
                                <BiDotsHorizontalRounded
                                    size="2em"
                                    
                                />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {consult.title}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {consult.description}
                        </Col>
                    </Row>
                    <Row>
                        {consult.image_path === null ? "" : <img src={consult.image_path} alt="consult" />}
                    </Row>
                </Container>
            )}
            <OptionsPopover deleteConsult={deleteConsult} destination={destination} id={id} open={open} anchorEl={anchorEl} onClose={() => handleClose()} />
        </>
    )
}