import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import * as moment from 'moment';
import axios from 'axios';
import { Chat } from './Chat';
import AppContext from '../AppContext/appContext';
import { MESSAGE_HISTORY_URL } from '../../Services/urls.services';

export default function ({ contact }) {
    const { user } = useContext(AppContext);
    const [chats, setChats] = useState([
        {
            message: 'style text',
            time: moment().format("hh:mm A")
        }
    ]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [message, setMessage] = useState('');
    const sendChat = () => {
        setChats([{
            message,
            time: moment().format("hh:mm:ss A"),
            id: user.id
        }, ...chats]);
        setMessage('')
    }

    const loadChat = () => {
        const id = contact.id;
        axios.get(MESSAGE_HISTORY_URL + `?receiverId=${contact.id}&limit=${limit}&page=${page}`,
            {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }
        ).then(response => {
            if (response.data.success) {
                const messages = [];
                response.data.data.forEach((data) => {
                    messages.push({
                        message: data.message,
                        time: moment(new Date(data.createdAt)).format("hh:mm:ss A"),
                        id: message.senderId
                    });
                })
                console.log("Messages: ", messages);
                setChats(messages);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        loadChat();
    }, [contact]);

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
            <div style={{ marginTop: '10px' }}>
                {
                    chats.map((chat, index) => {
                        const background = user.id == chat.id ? 'darkgray' : 'cornsilk';
                        return (
                            <Row sm={8} key={index} style={{ background, padding: '5px', borderRadius: 10, width: '80%', marginTop: '5px', marginLeft: '8px' }}>
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