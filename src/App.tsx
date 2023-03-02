import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from "./queries"
import {Button, Col, Divider, Row} from 'antd'

import ListUsers from "./components/ListUsers";
import CreateUser from "./components/CreateUser";

function App() {

    return (
        <div className='dvh-100 p-3'>
                <Row wrap gutter={24} style={{height: '100%'}}>
                    <Col flex='1' style={{height: '100%'}}><ListUsers/></Col>
                    <Col><Divider type='vertical' style={{height: '100%'}}/></Col>
                    <Col flex='1' style={{height: '100%'}}><CreateUser/></Col>
                </Row>
        </div>
    )
}

export default App
