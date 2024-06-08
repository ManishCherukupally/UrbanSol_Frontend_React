import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Flex, Grid, Group, NumberInput, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config';
const Setting_3 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`

    const socket = new WebSocket(`${wsUrl}?screen=Settings`);
    const socketRef = useRef(null);  // Store WebSocket reference

    socketRef.current = socket;  // Assign socket to reference


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

    socket.onopen = (event) => {
        console.log("websocket established", event);

        // socket.send(JSON.stringify(obj2));

    }
    socket.onmessage = (event) => {
        const res = JSON.parse(event.data)
        console.log(res)

        mainFunction(res)
        // console.log('Message from server:', event);
    }
    socket.onclose = () => {

        console.log('websocket connection closed');
        // setTimeout(websocket, reconnectDelay);

    }
    socket.onerror = (error) => {
        console.log("websocket connection error", error)
    }


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
        <div style={{ height: "100vh" }}>
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
                    <Button h={"3rem"} fz={"xl"} fw={600} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting2')}>BACK</Button>
                </Grid.Col>
                <Grid.Col span={9}>

                    <SimpleGrid cols={3} spacing={"4rem"} verticalSpacing={"3.85rem"} justify="center">
                        <h2></h2>
                        {/* <Text fz={"xl"} fw={700}>Present Time</Text> */}
                        <Text fz={"xl"} fw={700}>Set Value</Text>
                        <h2></h2>

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
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                    {/* <Button h={"3rem"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                        onClick={() => navigate('/setting3')}>NEXT</Button> */}
                    <h2></h2>
                    <Button id="saveButton" onClick={handleSaveButton} fz={"xl"} h={"3rem"} style={{ backgroundColor: "#d10000" }}>Save</Button>

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
