import { Button, Center, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { wsUrl } from './config';
import { useNavigate } from 'react-router-dom';
import OverlayModal from './OverlayModal';

const Operations = () => {
    const navigate = useNavigate()
    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [status, setStatus] = useState("")
    const [websocketError, setwebsocketError] = useState(false)
    // const url = `ws://192.168.29.144:8765?screen=Operations`;
    // const [status, { toggle }] = useDisclosure(true);
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const isMountedRef = useRef(true); // Track if the component is mounted

    const connectWebSocket = () => {
        if (!isMountedRef.current) return; // Prevent connecting if not mounted

        socketRef.current = new WebSocket(`${wsUrl}?screen=Operations`);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection for Page 1 established");
            // setIsConnected(true);
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };

        socketRef.current.onmessage = (event) => {
            // setResponse(event.data);
            const res = JSON.parse(event.data)
            console.log(res);
            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)

            if (res.Cycle_status === 'On') {
                setStatus(false)
            }
            else if (res.Cycle_status === 'Off') {
                setStatus(true)
            }
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection for Page 1 closed");
            // setIsConnected(false);

        };

        socketRef.current.onerror = (error) => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.error("WebSocket error on Page 1:", error);
            socketRef.current.close();
            if (isMountedRef.current) attemptReconnect();
        };
    };

    const attemptReconnect = () => {
        setTimeout(() => {
            console.log("Attempting to reconnect...");
            connectWebSocket();
        }, 5000); // Attempt reconnection after 5 seconds

    };

    useEffect(() => {
        isMountedRef.current = true;
        connectWebSocket();

        // return () => {
        //     isMountedRef.current = false; // Set to false when unmounting
        //     if (socketRef.current) {
        //         socketRef.current.close();
        //     }
        //     if (reconnectTimeoutRef.current) {
        //         clearTimeout(reconnectTimeoutRef.current);
        //     }
        // };
    }, []);

    const CycleStart = () => {

        // const socket = new WebSocket(`${wsUrl}?screen=Operations`)
        socketRef.current = new WebSocket(`${wsUrl}?screen=Operations`);
        const messageObj = {

            Cycle_status: 'On'
        }

        // if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        //     socketRef.current.send(JSON.stringify(messageObj));
        //     console.log(('sent'));
        // }
        socketRef.current.onopen = () => {
            socketRef.current.send(JSON.stringify(messageObj));
        }

        socketRef.current.onmessage = (event) => {
            // setResponse(event.data);
            const res = JSON.parse(event.data)
            console.log(res);

            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)

            if (res.Cycle_status === 'On') {
                setStatus(false)
            }
            else if (res.Cycle_status === 'Off') {
                setStatus(true)
            }
            console.log(status);


        };
        socketRef.current.onclose = () => {
            console.log("cycle stopped..");
            // setwebsocketError(true)

            // var date = new Date()
            // var dateArray = date.toISOString().split(".")
            // setpopupTime(dateArray[0].replace("T", " "))

            // socketRef.current.close();
            attemptReconnect();
        }

        socketRef.current.onerror = (error) => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.error("WebSocket error on Page 1:", error);
            socketRef.current.close();
            attemptReconnect();
        };

        // setStatus(false)
        // const messageObj = { Cycle_status: 'On' };
        // sendMessage(messageObj);
    };

    const CycleStop = () => {

        // const socket = new WebSocket(`${wsUrl}?screen=Operations`)
        socketRef.current = new WebSocket(`${wsUrl}?screen=Operations`);
        const messageObj = {

            Cycle_status: 'Off'
        }



        socketRef.current.onopen = () => {
            socketRef.current.send(JSON.stringify(messageObj));
        }

        socketRef.current.onmessage = (event) => {
            // setResponse(event.data);
            const res = JSON.parse(event.data)
            console.log(res);
            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)

            if (res.Cycle_status === 'On') {
                setStatus(false)
            }
            else if (res.Cycle_status === 'Off') {
                setStatus(true)
            }
            console.log(status);
        };

        socketRef.current.onclose = () => {
            console.log("cycle is ready to start..");
            // setwebsocketError(true)

            // var date = new Date()
            // var dateArray = date.toISOString().split(".")
            // setpopupTime(dateArray[0].replace("T", " "))

            // // console.error("WebSocket error on Page 1:", error);
            // socketRef.current.close();
            attemptReconnect();
        }

        socketRef.current.onerror = (error) => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.error("WebSocket error on Page 1:", error);
            socketRef.current.close();
            attemptReconnect();
        };
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
