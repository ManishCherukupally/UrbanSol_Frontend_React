import React, { useState } from 'react'
import { Button, Card, Container, Flex, Grid, Group, NumberInput, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config'
const Setting_2 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`

    const navigate = useNavigate()

    const [blowEditing, setblowEditing] = useState(false);
    const [blowTime, setblowTime] = useState(0);
    const [postblowTime, setPostblowTime] = useState(0)

    const [compostOutEditing, setcompostOutEditing] = useState(false);
    const [getCompostOutHours, setgetCompostOutHours] = useState(0);
    const [getCompostOutMinutes, setgetCompostOutMinutes] = useState(0);
    const [getCompostOutSeconds, setgetCompostOutSeconds] = useState(0);

    const [lowerTempEditing, setlowerTempEditing] = useState(false);
    const [lowerTempTime, setlowerTempTime] = useState(0);
    const [postlowerTempTime, setPostlowerTempTime] = useState(0)

    const [upperTempEditing, setupperTempEditing] = useState(false);
    const [upperTempTime, setupperTempTime] = useState(0);
    const [postupperTempTime, setPostupperTempTime] = useState(0)

    const [cyclesEditing, setcyclesEditing] = useState(false);
    const [cycles, setcycles] = useState(0);
    const [postcycles, setPostcycles] = useState(0)


    const [compostOuthours, setcompostOutHours] = useState(0);
    const [compostOutminutes, setcompostOutMinutes] = useState(0);
    const [compostOutseconds, setcompostOutSeconds] = useState(0);


    const socket = new WebSocket(`${wsUrl}?screen=Settings`)

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
        setblowTime(data.blower)

        setgetCompostOutHours(parseInt(data.compost_out_time / 3600))
        setgetCompostOutMinutes(parseInt((data.compost_out_time % 3600) / 60))
        setgetCompostOutSeconds(parseInt((data.compost_out_time % 3600) % 60))

        setlowerTempTime(data.temp_lower_limit)
        setupperTempTime(data.temp_upper_limit)
        setcycles(data.no_of_cycles)


    }


    const handleSaveButton = () => {
        setblowEditing(false)
        setcompostOutEditing(false)
        setlowerTempEditing(false)
        setupperTempEditing(false)
        setcyclesEditing(false)

        const CompostOutTotalSeconds = compostOuthours * 3600 + compostOutminutes * 60 + compostOutseconds;

        const messageObj = {
            blower: postblowTime === 0 ? blowTime : postblowTime,
            compost_out_time: CompostOutTotalSeconds,
            temp_lower_limit: postlowerTempTime === 0 ? lowerTempTime : postlowerTempTime,
            temp_upper_limit: postupperTempTime === 0 ? upperTempTime : postupperTempTime,
            no_of_cycles: postcycles === 0 ? cycles : postcycles,

        }

        const socket = new WebSocket(`${wsUrl}?screen=Settings`)

        socket.onopen = (event) => {
            console.log("websocket established", event);
            socket.send(JSON.stringify(messageObj));
        }


    }
    return (
        <div style={{ height: "100vh" }}>
            <Flex direction={"column"} justify={"space-between"}>
                <div class="header">
                    <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2>
                    <h2>SETTING-2</h2>
                    <h2 style={{ paddingRight: "2%" }}>HH:MM:SS</h2>
                </div>
                <div style={{ height: "76vh" }}>

                    <Container size={"xl"} maw={"100%"} m={0} pt={"1rem"}>


                        {/* <Flex align={"center"} justify={"end"} gap={"23%"}>
                        <Text fz={"xl"} fw={700}>Present Time</Text>
                        <Text fz={"xl"} fw={700} pr={"6%"}>Set Time</Text>
                        <Button fz={"xl"} h={"3rem"}>Save</Button>
                    </Flex>

                    <Card>
                        <Text fz={"xl"} fw={600}>Total Cycle Time</Text>
                    </Card> */}
                        <Grid >
                            <Grid.Col span={11} pl={"15%"}>
                                {/* <SimpleGrid cols={4}>

                                </SimpleGrid> */}
                                <SimpleGrid cols={4} spacing={"4.5rem"} justify="center">
                                    <h2></h2>
                                    <Text fz={"xl"} fw={700}>Present Time</Text>
                                    <Text fz={"xl"} fw={700}>Set Time</Text>
                                    <h2></h2>

                                    <Text fz={"xl"} fw={700}>Blower On Time</Text>
                                    <Text id="presenttcTime" fz={"xl"} fw={600}>123 Sec</Text>
                                    {blowEditing ?
                                        <NumberInput
                                            hideControls
                                            value={postblowTime === 0 ? blowTime : postblowTime} // Set initial value
                                            onChange={
                                                setPostblowTime} /> :
                                        <Text fz={"xl"} fw={600}>{blowTime} Sec </Text>
                                    }

                                    <Button h={"3rem"} w={"30%"} c={"black"} style={{ backgroundColor: "#e1e1e1" }}
                                        onClick={() => setblowEditing(true)}>Edit</Button>



                                    <Text fz={"xl"} fw={700}>Compost Out Time</Text>
                                    <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text>
                                    {compostOutEditing ?
                                        <Flex gap="0.5rem" align="center">
                                            <NumberInput
                                                h={40}
                                                hideControls
                                                value={compostOuthours}
                                                onChange={setcompostOutHours}
                                                placeholder="Hours"
                                            />
                                            <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                            <NumberInput
                                                h={40}
                                                hideControls
                                                value={compostOutminutes}
                                                onChange={setcompostOutMinutes}
                                                placeholder="Minutes"
                                            />
                                            <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                            <NumberInput
                                                h={40}
                                                hideControls
                                                value={compostOutseconds}
                                                onChange={setcompostOutSeconds}
                                                placeholder="Seconds"
                                            />

                                        </Flex>
                                        :
                                        <Group>
                                            <Flex align={"center"} gap={10}>
                                                <Text fz={"xl"} fw={600}>{getCompostOutHours}</Text>
                                                <Text fz={"sm"} fw={600}>Hrs </Text>
                                                <Text fz={"xl"} fw={600}>:</Text>
                                            </Flex>
                                            <Flex align={"center"} gap={10}>
                                                <Text fz={"xl"} fw={600}>{getCompostOutMinutes}</Text>
                                                <Text fz={"sm"} fw={600}>Min </Text>
                                                <Text fz={"xl"} fw={600}>:</Text>
                                            </Flex>
                                            <Flex align={"center"} gap={3}>
                                                <Text fz={"xl"} fw={600}>{getCompostOutSeconds}</Text>

                                                <Text fz={"sm"} fw={600}>Sec</Text>
                                            </Flex>
                                        </Group>
                                    }
                                    <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                        onClick={() => setcompostOutEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                                    <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
                                        <Text fz={"xl"} fw={700}>Heater Temp.
                                            <span>
                                                <br />
                                                Lower Limit</span></Text>
                                        <Text fz={"xl"} fw={700}>Heater Temp.
                                            <span>
                                                <br />
                                                Upper Limit</span></Text>
                                    </Flex>

                                    <Flex h={"11rem"} align={"center"}>
                                        <Text id="presentwait1" fz={"xl"} fw={600}>124 c</Text>
                                    </Flex>

                                    <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
                                        {lowerTempEditing ?
                                            <NumberInput
                                                hideControls
                                                value={postlowerTempTime === 0 ? lowerTempTime : postlowerTempTime} // Set initial value
                                                onChange={
                                                    // console.log(fwdTime)
                                                    setPostlowerTempTime
                                                } /> :
                                            <Text fz={"xl"} fw={600}>{lowerTempTime} c </Text>
                                        }

                                        {upperTempEditing ?
                                            <NumberInput
                                                hideControls
                                                value={postupperTempTime === 0 ? upperTempTime : postupperTempTime} // Set initial value
                                                onChange={
                                                    // console.log(fwdTime)
                                                    setPostupperTempTime
                                                } /> :
                                            <Text fz={"xl"} fw={600}>{upperTempTime} c</Text>
                                        }
                                    </Flex>

                                    <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
                                        <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                            onClick={() => setlowerTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                                        <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                            onClick={() => setupperTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>
                                    </Flex>

                                    {/* <Text fz={"xl"} fw={700}>Heater Temp. Lower Limit</Text>
                                    <Text id="presentwait1" fz={"xl"} fw={600}>12 : 12 Hrs</Text>
                                    {lowerTempEditing ?
                                        <NumberInput
                                            hideControls
                                            value={lowerTempTime} // Set initial value
                                            onChange={
                                                // console.log(fwdTime)
                                                setlowerTempTime
                                            } /> :
                                        <Text fz={"xl"} fw={600}>{lowerTempTime} Sec </Text>
                                    }
                                    <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                        onClick={() => setlowerTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                                    <Text fz={"xl"} fw={700}>Heater Temp. Upper Limit</Text>
                                    <Text id="presentrevTime" fz={"xl"} fw={600}>130 Sec</Text>
                                    {upperTempEditing ?
                                        <NumberInput
                                            hideControls
                                            value={upperTempTime} // Set initial value
                                            onChange={
                                                // console.log(fwdTime)
                                                setupperTempTime
                                            } /> :
                                        <Text fz={"xl"} fw={600}>{upperTempTime} Sec</Text>
                                    }
                                    <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                        onClick={() => setupperTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>
 */}


                                    <Text fz={"xl"} fw={700}>No. Of Cycles</Text>
                                    <Text id="presentwait2" fz={"xl"} fw={600}>125 </Text>
                                    {cyclesEditing ?
                                        <NumberInput
                                            hideControls
                                            value={postcycles === 0 ? cycles : postcycles} // Set initial value
                                            onChange={
                                                // console.log(fwdTime)
                                                setPostcycles
                                            } /> :
                                        <Text fz={"xl"} fw={600}>{cycles} </Text>
                                    }
                                    <Button id="fwdEdit" h={"3rem"} w={"30%"} c={"black"}
                                        onClick={() => setcyclesEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                                </SimpleGrid>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Flex justify={"end"}>
                                    <Button id="saveButton" onClick={handleSaveButton} fz={"xl"} h={"3rem"} fullWidth style={{ backgroundColor: "#d10000" }}>Save</Button>
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </div>

                <Flex className="stng1footer" justify={"space-between"} align={"center"}>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} ml={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting1')}>BACK</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} onClick={() => navigate('/')} >HOME</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting3')}>NEXT</Button>
                </Flex>
            </Flex>
        </div>
    )
}

export default Setting_2
