import React, { useState } from 'react';
import { Row, Col } from 'reactstrap'
import { Chat } from '../Chat/Chat';
import { Contacts } from '../Contacts/Contacts';
const Home = () => {
    const [contact, setContact] = useState(null)
    const loadChat = (contact) => {
        console.log(contact);
        setContact(contact);
    }
    return (
        <Row style={{ height: "100vh" }}>
            <Col sm={3} style={{ padding: '10', borderRight: '1px solid black' }}>
                <Contacts loadChat={loadChat}></Contacts>
            </Col>
            <Col sm={9}>
                <Chat contact={contact}></Chat>
            </Col>
        </Row>
    )
}

export default Home;