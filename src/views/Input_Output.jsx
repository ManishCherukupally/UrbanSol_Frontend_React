import { Button, Card, Center, Container, Divider, Flex, Grid, ScrollArea, Space, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { wsUrl } from './config'
import OverlayModal from './OverlayModal'

const Input_Output = () => {
    const [mmt, setmmt] = useState(false)
    const [bmt, setbmt] = useState(false)
    const [doorOpen, setdoorOpen] = useState(false)
    const [spp, setspp] = useState(false)
    const [emergency, setemergency] = useState(false)
    const [mmf, setmmf] = useState(false)
    const [mmr, setmmr] = useState(false)
    const [blowerMotor, setblowerMotor] = useState(false)
    const [heater, setheater] = useState(false)

    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [websocketError, setwebsocketError] = useState(false)
    // const [webSocket, setWebSocket] = useState()

    // const newSo = `${wsUrl}?screen=InputOutput`;
    // useEffect(() => {
    //     const newSocket = new WebSocket(`${wsUrl}?screen=InputOutput`); // Replace with your URL
    //     // const websocket = (socket) => {
    //     // const Socket = socket
    //     // const newSocket = new WebSocket(`${wsUrl}?screen=InputOutput`);
    //     newSocket.onopen = () => {
    //         setwebsocketError(false)
    //         console.log('WebSocket connection opened');
    //     };

    //     newSocket.onmessage = (event) => {
    //         const res = JSON.parse(event.data)
    //         console.log(res)

    //         // if (res.Pop_up && res.message) {
    //         //     setpopupStatus(res.Pop_up)
    //         //     setpopupMessage(res.message)
    //         // }
    //         // else {
    //         //     mainFunction(res)
    //         // }
    //         mainFunction(res)
    //         setpopupStatus(res.Pop_up)
    //         setpopupMessage(res.message)
    //         setpopupTime(res.Time_stamp)

    //     }

    //     newSocket.onclose = () => {
    //         setInterval(() => {
    //             // const sock = new WebSocket(`${wsUrl}?screen=InputOutput`);

    //             newSocket.onopen = () => {
    //                 setwebsocketError(false)
    //                 console.log('WebSocket connection opened');
    //             };
    //         }, 10)
    //         setwebsocketError(true)
    //         // newSocket.close()
    //         // setInterval(websocket, 1000);
    //         console.log('Websocket connection closed');
    //     }

    //     newSocket.onerror = (error) => {
    //         // setInterval(() => {
    //         //     const sock = new WebSocket(`${wsUrl}?screen=InputOutput`);

    //         //     sock.onopen = () => {
    //         //         setwebsocketError(false)
    //         //         console.log('WebSocket connection opened');
    //         //     };
    //         // }, 1000)
    //         setwebsocketError(true)
    //         // setTimeout(websocket, 1000);
    //         console.log("websocket connection error", error)
    //     }


    //     return () => {
    //         console.log(newSocket);
    //         if (newSocket) {
    //             newSocket.close();
    //             console.log('WebSocket connection CLOSED', newSocket);
    //         }
    //     };
    // }, []);

    // const socket = new WebSocket(`${wsUrl}?screen=InputOutput`)

    // socket.onopen = (event) => {
    //     console.log("websocket established", event);

    //     // socket.send(JSON.stringify(obj2));

    // }
    // socket.onmessage = (event) => {
    //     const res = JSON.parse(event.data)
    //     console.log(res)

    //     mainFunction(res)
    //     // console.log('Message from server:', event);
    // }
    // socket.onclose = () => {

    //     console.log('websocket connection closed');
    //     // setTimeout(websocket, reconnectDelay);

    // }
    // socket.onerror = (error) => {
    //     console.log("websocket connection error", error)
    // }
    // const url = `ws://192.168.29.76:8765?screen=InputOutput`;
    // // const webSocket = new WebSocket(url)
    // useEffect(() => {
    //     let socket
    //     let reconnectTimeout;

    //     const connectWebSocket = () => {
    //         socket = new WebSocket(url);
    //         // setWebSocket(socket)
    //         socket.onopen = (event) => {
    //             console.log("WebSocket established", event);
    //         };

    //         socket.onmessage = (event) => {
    //             const res = JSON.parse(event.data);
    //             mainFunction(res);  // Assuming mainFunction is defined elsewhere
    //         };

    //         socket.onclose = () => {
    //             console.log('WebSocket connection closed, attempting to reconnect...');
    //             reconnect();
    //         };

    //         socket.onerror = (error) => {
    //             console.log("WebSocket connection error", error);
    //             reconnect();
    //         };
    //     };

    //     const reconnect = () => {

    //         if (!reconnectTimeout) {
    //             reconnectTimeout = setTimeout(() => {
    //                 connectWebSocket();
    //                 reconnectTimeout = null;
    //             }, 2000); // Try to reconnect every 5 seconds
    //         }
    //     };

    //     const handleBeforeUnload = () => {
    //         if (socket) {
    //             socket.close();
    //         }
    //     };

    //     connectWebSocket();
    //     // window.addEventListener('beforeunload', handleBeforeUnload);


    //     return () => {
    //         if (socket) {
    //             socket.close();
    //             console.log('WebSocket connection closed');
    //         }
    //         if (reconnectTimeout) {
    //             clearTimeout(reconnectTimeout);
    //         }

    //         // window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [url]);


    let reconnectTimeout
    // useEffect(() => {
    //     const socket = new WebSocket(`${wsUrl}?screen=Manual`)

    //     // console.log(previousPopupStatus)

    //     // useEffect(() => {
    //     //     if (previousPopupStatus) {
    //     //         setpopupStatus(true);
    //     //     }
    //     //     else if (previousPopupStatus === false) {
    //     //         setpopupStatus(false)
    //     //     }

    //     // }, [previousPopupStatus])

    //     socket.onmessage = (event) => {
    //         const res = JSON.parse(event.data)
    //         console.log(res)
    //         // setpopupMesaage(res.message)
    //         // const currentPopupStatus = res.Pop_up;

    //         // if (previousPopupStatus !== currentPopupStatus) {
    //         //     // Update pop-up status only if it has changed
    //         //     setpopupMesaage(res.message);
    //         //     setpopupStatus(currentPopupStatus);
    //         //     setpreviousPopupStatus(currentPopupStatus)
    //         // }

    //         mainFunction(res)
    //     }
    //     socket.onclose = () => {
    //         socket.close()
    //         console.log('websocket connection closed');
    //         // setTimeout(websocket, reconnectDelay);

    //     }
    //     socket.onerror = (error) => {
    //         console.log("websocket connection error", error)
    //     }
    //     return () => {
    //         if (socket) {
    //             console.log('WebSocket connection closed: close event');
    //             socket.close();
    //         }
    //     };
    // })
    // const [socket, setSocket] = useState();
    // console.log(socket);
    // const newSocket = `${wsUrl}?screen=Manual`;
    const newSocket = new WebSocket(`${wsUrl}?screen=InputOutput`);
    useEffect(() => {


        const websocket = (socket) => {
            // const Socket = socket
            console.log("websocket function");
            // Replace with your URL
            // setSocket(newSocket)
            socket.onopen = () => {
                // setSocket(socket)
                setwebsocketError(false)
                console.log('WebSocket connection opened');


            };

            socket.onmessage = (event) => {
                const res = JSON.parse(event.data)
                console.log(res)

                // if (res.Pop_up && res.message) {
                //     setpopupStatus(res.Pop_up)
                //     setpopupMessage(res.message)
                // }
                // else {
                //     mainFunction(res)
                // }
                mainFunction(res)

                setpopupStatus(res.Pop_up)
                setpopupMessage(res.message)
                setpopupTime(res.Time_stamp)

            }

            socket.onclose = () => {
                if (!reconnectTimeout) {
                    reconnectTimeout = setTimeout(() => {
                        websocket(newSocket);
                        reconnectTimeout = null;
                    }, 2000); // Try to reconnect every 5 seconds
                }

                // setWebSocketStatus(true)
                setwebsocketError(true)
                // socket.close()
                var date = new Date()
                var dateArray = date.toISOString().split(".")
                setpopupTime(dateArray[0].replace("T", " "))

                // setTimeout(() => websocket(newSocket), 1000);


                console.log('Websocket connection closed');
            }

            socket.onerror = (error) => {
                if (!reconnectTimeout) {
                    reconnectTimeout = setTimeout(() => {
                        websocket(newSocket);
                        reconnectTimeout = null;
                    }, 2000); // Try to reconnect every 5 seconds
                }

                setwebsocketError(true)
                var date = new Date()
                var dateArray = date.toISOString().split(".")
                setpopupTime(dateArray[0].replace("T", " "))


                console.log("websocket connection error", error)
            }


        }
        websocket(newSocket)

        return () => {
            if (newSocket) {
                newSocket.close();
                console.log('WebSocket connection closed');
            }
        };

    }, [newSocket]);


    const mainFunction = (data) => {

        if (data.MMtrip === true) {
            setmmt(true)
        }
        else if (data.MMtrip === 'on') {
            setmmt(true)
        }
        else if (data.MMtrip === 1) {
            setmmt(true)
        }

        else if (data.MMtrip === false) {
            setmmt(false)
        }
        else if (data.MMtrip === 0) {
            setmmt(false)
        }
        else if (data.MMtrip === 'off') {
            setmmt(false)
        }
        ///////////////////////////////////////////////////////
        if (data.BMT === true) {
            setbmt(true)
        }
        else if (data.BMT === 'on') {
            setbmt(true)
        }
        else if (data.BMT === 1) {
            setbmt(true)
        }

        else if (data.BMT === false) {
            setbmt(false)
        }
        else if (data.BMT === 0) {
            setbmt(false)
        }
        else if (data.BMT === 'off') {
            setbmt(false)
        }
        ////////////////////////////////////////////////////////

        if (data.DoorOpen === true) {
            setdoorOpen(true)
        }
        else if (data.DoorOpen === 'on') {
            setdoorOpen(true)
        }
        else if (data.DoorOpen === 1) {
            setdoorOpen(true)
        }

        else if (data.DoorOpen === false) {
            setdoorOpen(false)
        }
        else if (data.DoorOpen === 0) {
            setdoorOpen(false)
        }
        else if (data.DoorOpen === 'off') {
            setdoorOpen(false)
        }
        ////////////////////////////////////////////////////////


        if (data.SppOk === true) {
            setspp(true)
        }
        else if (data.SppOk === 'on') {
            setspp(true)
        }
        else if (data.SppOk === 1) {
            setspp(true)
        }

        else if (data.SppOk === false) {
            setspp(false)
        }
        else if (data.SppOk === 0) {
            setspp(false)
        }
        else if (data.SppOk === 'off') {
            setspp(false)
        }
        ////////////////////////////////////////////////////////



        if (data.Eswitch === true) {
            setemergency(true)
        }
        else if (data.Eswitch === 'on') {
            setemergency(true)
        }
        else if (data.Eswitch === 1) {
            setemergency(true)
        }

        else if (data.Eswitch === false) {
            setemergency(false)
        }
        else if (data.Eswitch === 0) {
            setemergency(false)
        }
        else if (data.Eswitch === 'off') {
            setemergency(false)
        }
        ////////////////////////////////////////////////////////




        if (data.MMF === true) {
            setmmf(true)
        }
        else if (data.MMF === 'on') {
            setmmf(true)
        }
        else if (data.MMF === 1) {
            setmmf(true)
        }

        else if (data.MMF === false) {
            setmmf(false)
        }
        else if (data.MMF === 0) {
            setmmf(false)
        }
        else if (data.MMF === 'off') {
            setmmf(false)
        }
        ////////////////////////////////////////////////////////


        if (data.MMR === true) {
            setmmr(true)
        }
        else if (data.MMR === 'on') {
            setmmr(true)
        }
        else if (data.MMR === 1) {
            setmmr(true)
        }

        else if (data.MMR === false) {
            setmmr(false)
        }
        else if (data.MMR === 0) {
            setmmr(false)
        }
        else if (data.MMR === 'off') {
            setmmr(false)
        }
        ////////////////////////////////////////////////////////


        if (data.Blower_Motor === true) {
            setblowerMotor(true)
        }
        else if (data.Blower_Motor === 'on') {
            setblowerMotor(true)
        }
        else if (data.Blower_Motor === 1) {
            setblowerMotor(true)
        }

        else if (data.Blower_Motor === false) {
            setblowerMotor(false)
        }
        else if (data.Blower_Motor === 0) {
            setblowerMotor(false)
        }
        else if (data.Blower_Motor === 'off') {
            setblowerMotor(false)
        }
        ////////////////////////////////////////////////////////

        if (data.Heater === true) {
            setheater(true)
        }
        else if (data.Heater === 'on') {
            setheater(true)
        }
        else if (data.Heater === 1) {
            setheater(true)
        }

        else if (data.Heater === false) {
            setheater(false)
        }
        else if (data.Heater === 0) {
            setheater(false)
        }
        else if (data.Heater === 'off') {
            setheater(false)
        }
        ////////////////////////////////////////////////////////

    }

    return (
        <div>
            <Container size={"xl"}>
                {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                    <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
                )}
                <Grid>
                    <Grid.Col span={6}>
                        <Flex justify={"center"} align={"center"} direction={"column"}>
                            <h2 class="title">Inputs</h2>
                            <Card className='input-card' w={"100%"} radius={"md"} >
                                <ScrollArea h={"101%"} type='always' scrollbarSize={6} offsetScrollbars>
                                    <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                        <Text fz={"lg"} fw={700}>Main Motor Trip</Text>

                                        <Card align={"center"} w={"5rem"} radius={10} bg={mmt ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{mmt ? 'ON' : 'OFF'} </Card>
                                    </Flex>
                                    <Space h={15} />
                                    <Divider variant='dashed' />
                                    <Space h={15} />

                                    <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                        <Text fz={"lg"} fw={700}>Blower Motor Trip</Text>

                                        <Card align={"center"} w={"5rem"} radius={10} bg={bmt ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{bmt ? 'ON' : 'OFF'}</Card>
                                    </Flex>
                                    <Space h={15} />
                                    <Divider variant='dashed' />
                                    <Space h={15} />

                                    <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                        <Text fz={"lg"} fw={700}>Door Open</Text>

                                        <Card align={"center"} w={"5rem"} radius={10} bg={doorOpen ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{doorOpen ? 'ON' : 'OFF'}</Card>
                                    </Flex>
                                    <Space h={15} />
                                    <Divider variant='dashed' />
                                    <Space h={15} />

                                    <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                        <Text fz={"lg"} fw={700}>Spp OK</Text>

                                        <Card align={"center"} w={"5rem"} radius={10} bg={spp ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{spp ? 'ON' : 'OFF'}</Card>
                                    </Flex>
                                    <Space h={15} />
                                    <Divider variant='dashed' />
                                    <Space h={15} />

                                    <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                        <Text fz={"lg"} fw={700}>Emergency Switch</Text>

                                        <Card align={"center"} w={"5rem"} radius={10} bg={emergency ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{emergency ? 'ON' : 'OFF'}</Card>
                                    </Flex>
                                    {/* <Space h={15} /> */}
                                </ScrollArea>
                            </Card>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Flex justify={"center"} align={"center"} direction={"column"}>
                            <h2 class="title">Outputs</h2>
                            <Card className='output-card' w={"100%"} radius={"md"} >
                                <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                    <Text fz={"lg"} fw={700}>Main Motor Forward</Text>

                                    <Card align={"center"} w={"5rem"} radius={10} bg={mmf ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{mmf ? 'ON' : 'OFF'}</Card>
                                </Flex>
                                <Space h={15} />
                                <Divider variant='dashed' />
                                <Space h={15} />

                                <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                    <Text fz={"lg"} fw={700}>Main Motor Reverse</Text>

                                    <Card align={"center"} w={"5rem"} radius={10} bg={mmr ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{mmr ? 'ON' : 'OFF'}</Card>
                                </Flex>
                                <Space h={15} />
                                <Divider variant='dashed' />
                                <Space h={15} />

                                <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                    <Text fz={"lg"} fw={700}>Blower Motor</Text>

                                    <Card align={"center"} w={"5rem"} radius={10} bg={blowerMotor ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{blowerMotor ? 'ON' : 'OFF'}</Card>
                                </Flex>
                                <Space h={15} />
                                <Divider variant='dashed' />
                                <Space h={15} />

                                <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                    <Text fz={"lg"} fw={700}>Heater</Text>

                                    <Card align={"center"} w={"5rem"} radius={10} bg={heater ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{heater ? 'ON' : 'OFF'}</Card>
                                </Flex>
                                <Space h={15} />
                                {/* <Divider variant='dashed' /> */}
                                {/* <Space h={15} />

                                <Flex justify={"space-between"} align={"center"} ml={"1rem"} mr={"1rem"}>
                                    <Text fz={"lg"} fw={700}>emergency Switch</Text>

                                    <Card radius={10} bg={mmt ? "green" : "#d10000"} c={"white"} fz={"md"} fw={600}>{mmt ? 'ON' : 'OFF'}</Card>
                                </Flex> */}
                                {/* <Space h={15} /> */}

                            </Card>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default Input_Output
