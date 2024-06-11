import { Button, Center, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { wsUrl } from './config';
import { useNavigate } from 'react-router-dom';

const Operations = () => {
    const navigate = useNavigate()
    // const url = `ws://192.168.29.144:8765?screen=Operations`;
    // const [status, { toggle }] = useDisclosure(true);
    const [status, setStatus] = useState(true)

    const socketRef = useRef(null);  // Store WebSocket reference

    const sendMessage = (messageObj) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
        } else {
            console.error('WebSocket connection not ready to send messages.');
        }
    };

    const CycleStart = () => {

        const socket = new WebSocket(`${wsUrl}?screen=Operations`)
        const messageObj = {

            Cycle_status: 'On'
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // setStatus(false)
        // const messageObj = { Cycle_status: 'On' };
        // sendMessage(messageObj);
    };

    const CycleStop = () => {

        const socket = new WebSocket(`${wsUrl}?screen=Operations`)
        const messageObj = {

            Cycle_status: 'Off'
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // setStatus(true)
        // const messageObj = { Cycle_status: 'Off' };
        // sendMessage(messageObj);
    };

    useEffect(() => {
        // Create WebSocket connection on component mount
        const socket = new WebSocket(`${wsUrl}?screen=Operations`)

        socketRef.current = socket;  // Assign socket to reference

        socket.onopen = (event) => {
            console.log("websocket established", event);

        }
        socket.onmessage = (event) => {
            const res = JSON.parse(event.data)
            console.log(res)
            if (res.Cycle_status === 'On') {
                setStatus(false)
            }
            else if (res.Cycle_status === 'Off') {
                setStatus(true)
            }
        }


        // Handle errors and cleanup on component unmount
        // return () => {
        //     if (socket) {
        //         socket.close();
        //     }
        // };
    }, []);  // Empty dependency array to run only once

    return (
        <div style={{ height: "auto" }} >
            {/* <Flex justify={"center"} align={"center"} gap={"5rem"} m={"2rem"}>
                <Button onClick={CycleStart}>Cycle Start</Button>
                <Flex direction={"column"} justify={"center"} gap={"1rem"}>
                    <Button onClick={() => { toggle(); CycleStop(); }}>Cycle End</Button>
                    <Text>Cycle End Status: {status ? 'false' : 'true'}</Text>
                </Flex>
                <Button onClick={() => navigate('/setting1')}>Settings</Button>
            </Flex> */}

            <Center>
                <div style={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "center",
                    marginTop: "35%",
                    position: 'absolute',
                    zIndex: 10,
                }}>
                    {status ? (<Button onClick={CycleStart} size='5rem' h={"28rem"} w={"28rem"} radius={"100%"}
                        style={{ backgroundColor: "green", boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)" }}>START</Button>) :
                        (<Button onClick={CycleStop} size='5rem' h={"28rem"} w={"28rem"} radius={"100%"}
                            style={{ backgroundColor: "#d10000", boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)" }}>STOP</Button>
                        )}
                </div>


            </Center>

        </div>
    );
};

export default Operations;
