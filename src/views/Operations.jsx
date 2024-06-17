import { Button, Center, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { wsUrl } from './config';
import { useNavigate } from 'react-router-dom';
import OverlayModal from './OverlayModal';

const Operations = () => {
    const navigate = useNavigate()
    // const url = `ws://192.168.29.144:8765?screen=Operations`;
    // const [status, { toggle }] = useDisclosure(true);
    const [status, setStatus] = useState(true)

    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [websocketError, setwebsocketError] = useState(false)


    useEffect(() => {
        const socket = new WebSocket(`${wsUrl}?screen=Operations`)
        const websocket = () => {
            // const socket = new WebSocket(`${wsUrl}?screen=Operations`)

            // Assign socket to reference

            socket.onopen = (event) => {
                setwebsocketError(false)
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
                setpopupStatus(res.Pop_up)
                setpopupMessage(res.message)
                setpopupTime(res.Time_stamp)
            }

            socket.onclose = () => {
                // setwebsocketError(true)
                // socket.close()

                var date = new Date()
                var dateArray = date.toISOString().split(".")
                setpopupTime(dateArray[0].replace("T", " "))

                setTimeout(websocket, 1000);
                console.log('Websocket connection closed');
                // console.log(popupTime);
            }

            socket.onerror = (error) => {
                setwebsocketError(true)
                var date = new Date()
                var dateArray = date.toISOString().split(".")
                setpopupTime(dateArray[0].replace("T", " "))

                setTimeout(websocket, 1000);
                console.log("websocket connection error", error)
            }




        }
        // Create WebSocket connection on component mount
        websocket()
        return () => {
            if (socket) {
                socket.close();
                console.log('WebSocket connection closed');
            }
        };

        // Handle errors and cleanup on component unmount
        // return () => {
        //     if (socket) {
        //         socket.close();
        //     }
        // };
    }, []);  // Empty dependency array to run only once


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

        // setStatus(true)
        // const messageObj = { Cycle_status: 'Off' };
        // sendMessage(messageObj);
    };



    return (
        <div style={{ height: "auto" }} >
            {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
            )}
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

                    width: "100vw",
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "40%",
                    position: 'absolute',
                    zIndex: 10,
                }}>
                    {status ? (<Button onClick={CycleStart} size='4rem' h={"22rem"} w={"22rem"} radius={"100%"}
                        style={{ backgroundColor: "green", boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)" }}>START</Button>) :
                        (<Button onClick={CycleStop} size='4rem' h={"22rem"} w={"22rem"} radius={"100%"}
                            style={{ backgroundColor: "#d10000", boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)" }}>STOP</Button>
                        )}
                </div>


            </Center>

        </div>
    );
};

export default Operations;
