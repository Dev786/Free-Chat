import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { CONTACTS_URL } from '../../Services/urls.services';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/appContext';
export const Contacts = ({ loadChat }) => {
    const { user } = useContext(AppContext);
    console.log("user", user);
    const [contacts, setContacts] = useState([]);
    const fetchContacts = () => {
        axios.get(CONTACTS_URL, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((response) => {
            setContacts(response.data.data);
        })
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    return (
        <div>
            <Row>
                <Col>
                    <p style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px', borderBottom: '2px Solid black' }}>Contacts</p>
                </Col>
            </Row>
            {
                contacts.map(contact => {
                    return (
                        <Row style={{ borderBottom: '1px solid black', padding: '20px' }}>
                            <div onClick={() => { loadChat(contact) }}> {`${contact.firstName + " " + contact.lastName}`}</div>
                        </Row>
                    )
                })
            }
        </div>
    )
}