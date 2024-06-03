import { Button, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { wsUrl } from './config';
import { useNavigate } from 'react-router-dom';

const Operations = () => {
    const navigate = useNavigate()
    // const url = `ws://192.168.29.144:8765?screen=Operations`;
    const [status, { toggle }] = useDisclosure(true);

    const socketRef = useRef(null);  // Store WebSocket reference

    const sendMessage = (messageObj) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
        } else {
            console.error('WebSocket connection not ready to send messages.');
        }
    };

    const CycleStart = () => {
        const messageObj = { Cycle_start: 'On' };
        sendMessage(messageObj);
    };

    const CycleStop = () => {
        const messageObj = { Cycle_stop: status };
        sendMessage(messageObj);
    };

    useEffect(() => {
        // Create WebSocket connection on component mount
        const socket = new WebSocket(`${wsUrl}?screen=Operations`)

        socketRef.current = socket;  // Assign socket to reference

        socket.onopen = (event) => {
            console.log("websocket established", event);
        };

        // Handle errors and cleanup on component unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);  // Empty dependency array to run only once

    return (
        <div>
            <Flex justify={"center"} align={"center"} gap={"5rem"} m={"2rem"}>
                <Button onClick={CycleStart}>Cycle Start</Button>
                <Flex direction={"column"} justify={"center"} gap={"1rem"}>
                    <Button onClick={() => { toggle(); CycleStop(); }}>Cycle End</Button>
                    <Text>Cycle End Status: {status ? 'false' : 'true'}</Text>
                </Flex>
                <Button onClick={() => navigate('/setting1')}>Settings</Button>
            </Flex>
        </div>
    );
};

export default Operations;
