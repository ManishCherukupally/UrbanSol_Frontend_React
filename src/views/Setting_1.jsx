import { Button, Card, Container, Flex, Grid, Group, NumberInput, ScrollArea, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import '../style.css'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config'
const Setting_1 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`
    // const socket = new WebSocket(`${wsUrl}?screen=Settings`)

    const navigate = useNavigate()

    const [tcEditing, setTcEditing] = useState(false);
    const [getTcHours, setgetTcHours] = useState(0);
    const [getTcMinutes, setgetTcMinutes] = useState(0);
    const [getTcSeconds, setgetTcSeconds] = useState(0);

    const [fwdEditing, setfwdEditing] = useState(false);
    const [fwdTime, setfwdTime] = useState(0);
    const [postfwdTime, setPostfwdTime] = useState(0)


    const [wait1Editing, setwait1Editing] = useState(false);
    const [wait1Time, setwait1Time] = useState(0);
    const [postwait1Time, setPostwait1Time] = useState(0)


    const [revEditing, setrevEditing] = useState(false);
    const [revTime, setrevTime] = useState(0);
    const [postrevTime, setPostrevTime] = useState(0)


    const [wait2Editing, setwait2Editing] = useState(false);
    const [wait2Time, setwait2Time] = useState(0);
    const [postwait2Time, setPostwait2Time] = useState(0)


    const [waitCycleEditing, setwaitCycleEditing] = useState(false);
    const [getwaitCycleHours, setgetwaitCycleHours] = useState(0);
    const [getwaitCycleMinutes, setgetwaitCycleMinutes] = useState(0);
    const [getwaitCycleSeconds, setgetwaitCycleSeconds] = useState(0);




    const [tchours, setTcHours] = useState(0);
    const [tcminutes, setTCMinutes] = useState(0);
    const [tcseconds, setTcSeconds] = useState(0);

    const [waitCyclehours, setwaitCycleHours] = useState(0);
    const [waitCycleminutes, setwaitCycleMinutes] = useState(0);
    const [waitCycleseconds, setwaitCycleSeconds] = useState(0);
    // const [totalTimeInSecs, setTotalTimeInSecs] = useState(0);

    // const convertTimeToSeconds = () => {
    //     const totalSeconds = tchours * 3600 + minutes * 60 + seconds;
    //     // setTotalTimeInSecs(totalSeconds);
    // };


    // const socket = new WebSocket(url)
    useEffect(() => {
        const newSocket = new WebSocket(`${wsUrl}?screen=Settings`); // Replace with your URL

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
            // setSocket(newSocket);


        };

        newSocket.onmessage = (event) => {
            const res = JSON.parse(event.data)
            console.log(res)

            mainFunction(res)
        }

        newSocket.onclose = () => {
            // newSocket.close()
            console.log('Websocket connection closed');
        }

        newSocket.onerror = (error) => {
            console.log("websocket connection error", error)
        }

        return () => {
            if (newSocket) {
                newSocket.close();
                console.log('WebSocket connection closed');
            }
        };
    }, []);
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

    const mainFunction = (data) => {
        // setTcTime(data.total_cycle_time)

        setgetTcHours(parseInt(data.total_cycle_time / 3600))
        setgetTcMinutes(parseInt((data.total_cycle_time % 3600) / 60))
        setgetTcSeconds(parseInt((data.total_cycle_time % 3600) % 60))

        setfwdTime(data.motor_fwd_time)

        setwait1Time(data.fwd_wait_time)

        setrevTime(data.motor_rev_time)

        setwait2Time(data.rev_wait_time)

        setgetwaitCycleHours(parseInt(data.wait_time_in_cycles / 3600))
        setgetwaitCycleMinutes(parseInt((data.wait_time_in_cycles % 3600) / 60))
        setgetwaitCycleSeconds(parseInt((data.wait_time_in_cycles % 3600) % 60))
    }


    const handleSaveButton = () => {
        setTcEditing(false)
        setfwdEditing(false)
        setwait1Editing(false)
        setrevEditing(false)
        setwait2Editing(false)
        setwaitCycleEditing(false)

        const TCtotalSeconds = tchours * 3600 + tcminutes * 60 + tcseconds;
        const WaitCycletotalSeconds = waitCyclehours * 3600 + waitCycleminutes * 60 + waitCycleseconds;
        const messageObj = {

            total_cycle_time: TCtotalSeconds,
            motor_fwd_time: postfwdTime === 0 ? fwdTime : postfwdTime,
            fwd_wait_time: postwait1Time === 0 ? wait1Time : postwait1Time,
            motor_rev_time: postrevTime === 0 ? revTime : postrevTime,
            rev_wait_time: postwait2Time === 0 ? wait2Time : postwait2Time,
            wait_time_in_cycles: WaitCycletotalSeconds
        }

        const socket = new WebSocket(`${wsUrl}?screen=Settings`)

        socket.onopen = (event) => {
            console.log("websocket established", event);
            socket.send(JSON.stringify(messageObj));
        }


    }
    // const handleTcTimeChange = (event) => {
    //     setTcTime(event.currentTarget.value);
    // };
    return (
        <div style={{ height: "110vh" }} >
            {/* <Flex direction={"column"} justify={"space-between"}> */}
            {/* <div class="header">
                    <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2>
                    <h2>SETTING-1</h2>
                    <h2 style={{ paddingRight: "2%" }}>HH:MM:SS</h2>
                </div> */}


            {/* <Container maw={"100%"} m={0} pt={"1rem"}> */}


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

                </Grid.Col>
                <Grid.Col span={9} >

                    <SimpleGrid cols={3} spacing={"4rem"} verticalSpacing={"2.5rem"} style={{ display: "grid", alignItems: "center" }}>
                        <div></div>

                        <Text fz={"xl"} fw={700}>Set Value</Text>
                        <div></div>

                        <Text fz={"xl"} fw={700} style={{ display: "flex", alignItems: "center" }}>Total Cycle Time</Text>
                        {/* <Text id="presenttcTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {tcEditing ?
                            <Flex gap="0.5rem" align="center">
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={tchours === 0 ? getTcHours : tchours}
                                    onChange={setTcHours}
                                    placeholder="Hours"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={tcminutes === 0 ? getTcMinutes : tcminutes}
                                    onChange={setTCMinutes}
                                    placeholder="Minutes"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={tcseconds === 0 ? getTcSeconds : tcseconds}
                                    onChange={setTcSeconds}
                                    placeholder="Seconds"
                                />

                            </Flex>
                            // <NumberInput
                            //     value={tcTime} // Set initial value to current tcTime
                            //     onChange={(event) => {
                            //         console.log(tcTime)
                            //         setTcTime(event.currentTarget.value); // Update state with edited value
                            //     }}
                            //     onBlur={() => setTcEditing(false)} // Reset editing state on blur
                            // /> 
                            :
                            // <Text fz={"xl"} fw={600}>{getTcSeconds} </Text>
                            <Group>
                                <Flex align={"center"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{getTcHours}</Text>
                                    <Text fz={"xl"} fw={600}>H </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"center"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{getTcMinutes}</Text>
                                    <Text fz={"xl"} fw={600}>M </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"center"} gap={3}>
                                    <Text fz={"xl"} fw={600}>{getTcSeconds}</Text>

                                    <Text fz={"xl"} fw={600}>S</Text>
                                </Flex>
                            </Group>
                        }

                        <Button h={"3rem"} w={"5rem"} c={"black"} style={{ backgroundColor: "#e1e1e1" }}
                            onClick={() => setTcEditing(true)}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Forward Motor Time</Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {fwdEditing ?
                            <NumberInput
                                hideControls
                                value={postfwdTime === 0 ? fwdTime : postfwdTime} // Set initial value
                                onChange={
                                    setPostfwdTime} /> :
                            <Text fz={"xl"} fw={600}>{fwdTime} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setfwdEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Wait Time (Forward)</Text>
                        {/* <Text id="presentwait1" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {wait1Editing ?
                            <NumberInput
                                hideControls
                                value={postwait1Time === 0 ? wait1Time : postwait1Time} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostwait1Time
                                } /> :
                            <Text fz={"xl"} fw={600}>{wait1Time} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setwait1Editing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Reverse Motor Time</Text>
                        {/* <Text id="presentrevTime" fz={"xl"} fw={600}>130 Sec</Text> */}
                        {revEditing ?
                            <NumberInput
                                hideControls
                                value={postrevTime === 0 ? revTime : postrevTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostrevTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{revTime} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setrevEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Wait Time (Reverse)</Text>
                        {/* <Text id="presentwait2" fz={"xl"} fw={600}>125 Sec</Text> */}
                        {wait2Editing ?
                            <NumberInput
                                hideControls
                                value={postwait2Time === 0 ? wait2Time : postwait2Time} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostwait2Time
                                } /> :
                            <Text fz={"xl"} fw={600}>{wait2Time} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setwait2Editing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700} style={{ display: "flex", alignItems: "center" }}>Wait Time in Cycle</Text>
                        {/* <Text id="presentwaitCycle" fz={"xl"} fw={600}>12 : 12 Min</Text> */}
                        {waitCycleEditing ?
                            // <TextInput
                            //     value={waitCycleTime} // Set initial value
                            //     onChange={(event) => {
                            //         // console.log(fwdTime)
                            //         setwaitCycleTime(event.currentTarget.value)
                            //     }} />
                            <Flex gap="0.5rem" align="center">
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={waitCyclehours === 0 ? getwaitCycleHours : waitCyclehours}
                                    onChange={setwaitCycleHours}
                                    placeholder="Hours"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={waitCycleminutes === 0 ? getwaitCycleMinutes : waitCycleminutes}
                                    onChange={setwaitCycleMinutes}
                                    placeholder="Minutes"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    h={40}
                                    hideControls
                                    value={waitCycleseconds === 0 ? getwaitCycleSeconds : waitCycleseconds}
                                    onChange={setwaitCycleSeconds}
                                    placeholder="Seconds"
                                />

                            </Flex>
                            :
                            <Group>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{getwaitCycleHours}</Text>
                                    <Text fz={"xl"} fw={600}>H </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{getwaitCycleMinutes}</Text>
                                    <Text fz={"xl"} fw={600}>M </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{getwaitCycleSeconds}</Text>

                                    <Text fz={"xl"} fw={600}>S</Text>
                                </Flex>
                            </Group>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => setwaitCycleEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                    </SimpleGrid>

                </Grid.Col>
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button h={"3rem"} fz={"lg"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                            onClick={() => navigate('/setting2')}>NEXT</Button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button id="saveButton" onClick={handleSaveButton} fz={"lg"} h={"3rem"} style={{ backgroundColor: "#d10000" }}>SAVE</Button>
                    </div>
                </Grid.Col>
            </Grid>
            {/* </Container> */}


            {/* <Flex className="stng1footer" justify={"space-between"} align={"center"}>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} ml={"1%"} onClick={() => navigate('/')} >HOME</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                        onClick={() => navigate('/setting2')}>NEXT</Button>
                </Flex> */}
            {/* </Flex> */}
        </div>
    )
}

export default Setting_1
