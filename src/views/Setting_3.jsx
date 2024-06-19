import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Flex, Grid, Group, NumberInput, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config';
import { MdArrowLeft } from 'react-icons/md';
import OverlayModal from './OverlayModal';
const Setting_3 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`

    // const socket = new WebSocket(`${wsUrl}?screen=Settings`);
    // const socketRef = useRef(null);  // Store WebSocket reference

    // socketRef.current = socket;  // Assign socket to reference


    const navigate = useNavigate()


    const [heaterEditing, setheaterEditing] = useState(false);
    const [heaterTime, setheaterTime] = useState(0);
    const [postHeater, setPostHeater] = useState(0)
    // console.log(postHeater)
    const [overLoadEditing, setoverLoadEditing] = useState(false);
    const [overLoadTime, setoverLoadTime] = useState(0);
    const [postoverLoadTime, setPostoverLoadTime] = useState(0)

    const [crusherStartEditing, setcrusherStartEditing] = useState(false);
    const [crusherStartTime, setcrusherStartTime] = useState(0);
    const [postcrusherStartTime, setPostcrusherStartTime] = useState(0)

    const [crusherRevEditing, setcrusherRevEditing] = useState(false);
    const [crusherRevTime, setcrusherRevTime] = useState(0);
    const [postcrusherRevTime, setPostcrusherRevTime] = useState(0)

    const [currentFreqEditing, setcurrentFreqEditing] = useState(false);
    const [currentFreqTime, setcurrentFreqTime] = useState(0);
    const [postcurrentFreqTime, setPostcurrentFreqTime] = useState(0)

    // const socket = new WebSocket(`${wsUrl}?screen=Settings`)
    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [websocketError, setwebsocketError] = useState(false)


    let reconnectTimeout
    const newSocket = new WebSocket(`${wsUrl}?screen=Settings`);
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
                // setwebsocketError(true)
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
        // setTcTime(data.total_cycle_time)
        setheaterTime(data.heater_temp_cut_off)
        setoverLoadTime(data.overload_current_time)
        setcrusherStartTime(data.delay_time_for_crusher_start)
        setcrusherRevTime(data.delay_time_for_crusher_rev)
        setcurrentFreqTime(data.crusher_freq)

    }

    const handleSaveButton = () => {
        setheaterEditing(false)
        setoverLoadEditing(false)
        setcrusherStartEditing(false)
        setcrusherRevEditing(false)
        setcurrentFreqEditing(false)

        const messageObj = {

            heater_temp_cut_off: postHeater === 0 ? heaterTime : postHeater,
            overload_current_time: postoverLoadTime === 0 ? overLoadTime : postoverLoadTime,
            delay_time_for_crusher_start: postcrusherStartTime === 0 ? crusherStartTime : postcrusherStartTime,
            delay_time_for_crusher_rev: postcrusherRevTime === 0 ? crusherRevTime : postcrusherRevTime,
            crusher_freq: postcurrentFreqTime === 0 ? currentFreqTime : postcurrentFreqTime

        }

        const socket = new WebSocket(`${wsUrl}?screen=Settings`)

        socket.onopen = (event) => {
            console.log("websocket established", event);
            socket.send(JSON.stringify(messageObj));
        }


    }
    return (
        <div style={{ height: "115vh" }}>
            {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
            )}
            {/* <Flex direction={"column"} justify={"space-between"}> */}
            {/* <div class="header">
                    <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2>
                    <h2>SETTING-3</h2>
                    <h2 style={{ paddingRight: "2%" }}>HH:MM:SS</h2>
                </div> */}
            {/* <div style={{ height: "76vh" }}>

                    <Container size={"xl"} maw={"100%"} m={0} pt={"1rem"}> */}


            {/* <Flex align={"center"} justify={"end"} gap={"23%"}>
                        <Text fz={"xl"} fw={700}>Present Time</Text>
                        <Text fz={"xl"} fw={700} pr={"6%"}>Set Time</Text>
                        <Button fz={"xl"} h={"3rem"}>Save</Button>
                    </Flex>

                    <Card>
                        <Text fz={"xl"} fw={600}>Total Cycle Time</Text>
                    </Card> */}
            <Grid >
                <Grid.Col span={2}>
                    <Button radius={10} h={"3rem"} fz={"xl"} fw={600} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting2')} pl={9}><MdArrowLeft size={30} />BACK</Button>
                </Grid.Col>
                <Grid.Col span={9}>

                    <SimpleGrid cols={3} spacing={"4rem"} verticalSpacing={"2.5rem"} style={{ display: "grid", alignItems: "center" }}>
                        <div></div>
                        {/* <Text fz={"xl"} fw={700}>Present Time</Text> */}
                        <Text fz={"xl"} fw={700}>Set Value</Text>
                        <div></div>

                        <Text fz={"xl"} fw={700}>Heater Temperature  Cut Off Limit
                        </Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>123 C</Text> */}
                        {heaterEditing ?
                            <NumberInput
                                hideControls
                                value={postHeater === 0 ? heaterTime : postHeater} // Set initial value
                                onChange={setPostHeater} /> :
                            <Text fz={"xl"} fw={600}>{heaterTime}° C </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setheaterEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                        <Text fz={"xl"} fw={700}>Overload Current  Limit
                        </Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>120 A</Text> */}
                        {overLoadEditing ?
                            <NumberInput
                                hideControls
                                value={postoverLoadTime === 0 ? overLoadTime : postoverLoadTime} // Set initial value
                                onChange={
                                    setPostoverLoadTime} /> :
                            <Text fz={"xl"} fw={600}>{overLoadTime} A </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setoverLoadEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Delay Time For Crusher Start After OL
                        </Text>
                        {/* <Text id="presentwait1" fz={"xl"} fw={600}>124 Sec</Text> */}
                        {crusherStartEditing ?
                            <NumberInput
                                hideControls
                                value={postcrusherStartTime === 0 ? crusherStartTime : postcrusherStartTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostcrusherStartTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{crusherStartTime} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setcrusherStartEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Delay Time For Crusher Reverse After OL
                        </Text>
                        {/* <Text id="presentrevTime" fz={"xl"} fw={600}>130 Sec</Text> */}
                        {crusherRevEditing ?
                            <NumberInput
                                hideControls
                                value={postcrusherRevTime === 0 ? crusherRevTime : postcrusherRevTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostcrusherRevTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{crusherRevTime} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setcrusherRevEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Crusher Frequency</Text>
                        {/* <Text id="presentwait2" fz={"xl"} fw={600}>125 Hz</Text> */}
                        {currentFreqEditing ?
                            <NumberInput
                                hideControls
                                value={postcurrentFreqTime === 0 ? currentFreqTime : postcurrentFreqTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostcurrentFreqTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{currentFreqTime} Hz</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setcurrentFreqEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                    </SimpleGrid>

                </Grid.Col>
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button h={"3rem"} fz={"lg"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                            onClick={() => navigate('/setting3')}>NEXT</Button>
                    </div> */}

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button radius={10} id="saveButton" onClick={handleSaveButton} fz={"lg"} h={"3rem"} style={{ backgroundColor: "#d10000" }}>SAVE</Button>
                    </div>
                </Grid.Col>
            </Grid>
            {/* </Container> */}
            {/* </div> */}

            {/* <Flex className="stng1footer" justify={"space-between"} align={"center"}>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} ml={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                        onClick={() => navigate('/setting2')}>BACK</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} mr={"1%"} onClick={() => navigate('/')}>HOME</Button>

                </Flex> */}
            {/* </Flex> */}
        </div>
    )
}

export default Setting_3
