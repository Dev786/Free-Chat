import React, { useState } from 'react';

import { Row, Col, Input, Button } from 'reactstrap';
import * as moment from 'moment';
import axios from 'axios';
import { Chat } from './Chat';

export default function ({ contact }) {
    const [chats, setChats] = useState([
        {
            message: 'style text',
            time: moment().format("hh:mm:ss A")
        }
    ]);
    const [message, setMessage] = useState('');
    const sendChat = () => {
        console.log("Message", message);
        setChats([{
            message,
            time: moment().format("hh:mm:ss A")
        }, ...chats]);
        setMessage('')
    }

    const loadChat = () => {

    }

    return (
        <div>
            <Row>
                <Col sm={12} style={{ padding: '10px', background: 'lightgrey' }}>{contact.firstName + ' ' + contact.lastName}</Col>
                <Col></Col>
            </Row>
            <div>
                <Row>
                    <Row sm={12} style={{ marginTop: '10px' }}>
                        <Col sm={10}>
                            <Input type='text' placeholder='Type Message Here' style={{ borderRadius: 10 }} onChange={(e) => { setMessage(e.target.value) }} value={message}></Input>
                        </Col>
                        <Col sm={2}>
                            <Button color='primary' onClick={sendChat} style={{ borderRadius: 10 }}>Send</Button>
                        </Col>
                    </Row>
                </Row>
            </div>
            <div style={{marginTop: '10px'}}>
                {
                    chats.map((chat, index) => {
                        return (
                            <Row sm={8} key={index} style={{ background: 'lightgrey', padding: '5px', borderRadius: 10, width: '80%', marginTop: '5px', marginLeft: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{chat.message}</span>
                                <span style={{ fontSize: '12px', textAlign: 'right' }}>{chat.time}</span>
                            </Row>
                        )
                    })
                }
            </div>
        </div>
    )
}