import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Flex, Grid, Group, NumberInput, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import OverlayModal from './OverlayModal'
const Setting_2 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`

    const navigate = useNavigate()

    const [saveStatus, setSaveStatus] = useState(true)

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


    // const [compostOuthours, setcompostOutHours] = useState(0);
    // const [compostOutminutes, setcompostOutMinutes] = useState(0);
    // const [compostOutseconds, setcompostOutSeconds] = useState(0);

    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [websocketError, setwebsocketError] = useState(false)

    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const isMountedRef = useRef(true); // Track if the component is mounted

    const connectWebSocket = () => {
        if (!isMountedRef.current) return; // Prevent connecting if not mounted

        socketRef.current = new WebSocket(`${wsUrl}?screen=Settings`);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection for Page 1 established");
            // setIsConnected(true);
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };

        socketRef.current.onmessage = (event) => {
            const res = JSON.parse(event.data)
            mainFunction(res)
            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection  closed");
            // setIsConnected(false);
            // attemptReconnect();

        };

        socketRef.current.onerror = (error) => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.error("WebSocket error:", error);
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

        return () => {
            isMountedRef.current = false; // Set to false when unmounting
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

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

        const CompostOutTotalSeconds = getCompostOutHours * 3600 + getCompostOutMinutes * 60 + getCompostOutSeconds;

        const messageObj = {
            blower: postblowTime === 0 ? blowTime : postblowTime,
            compost_out_time: CompostOutTotalSeconds,
            temp_lower_limit: postlowerTempTime === 0 ? lowerTempTime : postlowerTempTime,
            temp_upper_limit: postupperTempTime === 0 ? upperTempTime : postupperTempTime,
            no_of_cycles: postcycles === 0 ? cycles : postcycles,

        }

        socketRef.current = new WebSocket(`${wsUrl}?screen=Settings`)

        socketRef.current.onopen = (event) => {
            console.log("websocket established", event);
            socketRef.current.send(JSON.stringify(messageObj));
        }

        socketRef.current.onmessage = (event) => {
            const res = JSON.parse(event.data)
            mainFunction(res)
            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)
        };

        socketRef.current.onclose = (event) => {
            console.log("Websocket closed", event)
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

    }
    return (
        <div style={{ height: "100vh" }} >
            {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
            )}
            {/* <Flex direction={"column"} justify={"space-between"}> */}
            {/* <div class="header">
                    <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2>
                    <h2>SETTING-2</h2>
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
                    <Button radius={10} h={"3rem"} fz={"xl"} fw={600} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting1')} pl={9}><MdArrowLeft size={30} />BACK</Button>
                </Grid.Col>
                <Grid.Col span={9}>
                    {/* <SimpleGrid cols={4}>

                                </SimpleGrid> */}
                    <SimpleGrid cols={3} spacing={"4rem"} verticalSpacing={"2.5rem"} style={{ display: "grid", alignItems: "center" }} >

                        <div></div>
                        {/* <div></div> */}
                        {/* <Text fz={"xl"} fw={700}>Present Time</Text> */}
                        <Text fz={"xl"} fw={700}>Set Value</Text>
                        <div></div>

                        <Text fz={"xl"} fw={700}>Blower On Time</Text>
                        {/* <Text id="presenttcTime" fz={"xl"} fw={600}>123 Sec</Text> */}
                        {blowEditing ?
                            <NumberInput

                                hideControls
                                value={postblowTime === 0 ? blowTime : postblowTime} // Set initial value
                                onChange={
                                    setPostblowTime} /> :
                            <Text fz={"xl"} fw={600}>{blowTime} Sec </Text>
                        }

                        <Button h={"3rem"} w={"5rem"} c={"black"} style={{ backgroundColor: "#e1e1e1" }}
                            onClick={() => {
                                setblowEditing(true)
                                setSaveStatus(false)
                            }
                            }>Edit</Button>



                        <Text fz={"xl"} fw={700}  >Compost Out Time</Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {compostOutEditing ?
                            <Flex gap="0.5rem" align="center">
                                <NumberInput
                                    max={24}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={getCompostOutHours}
                                    onChange={setgetCompostOutHours}
                                    placeholder="Hours"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={getCompostOutMinutes}
                                    onChange={setgetCompostOutMinutes}
                                    placeholder="Minutes"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <NumberInput
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={getCompostOutSeconds}
                                    onChange={setgetCompostOutSeconds}
                                    placeholder="Seconds"
                                />

                            </Flex>
                            :
                            <Group>
                                <Flex align={"center"} gap={10}>
                                    <Text fz={"xl"} fw={600} >{getCompostOutHours}</Text>
                                    <Text fz={"xl"} fw={600} >H </Text>
                                    <Text fz={"xl"} fw={600} >:</Text>
                                </Flex>
                                <Flex align={"center"} gap={10}>
                                    <Text fz={"xl"} fw={600} >{getCompostOutMinutes}</Text>
                                    <Text fz={"xl"} fw={600} >M </Text>
                                    <Text fz={"xl"} fw={600} >:</Text>
                                </Flex>
                                <Flex align={"center"} gap={3}>
                                    <Text fz={"xl"} fw={600} >{getCompostOutSeconds}</Text>

                                    <Text fz={"xl"} fw={600} > S</Text>
                                </Flex>
                            </Group>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setcompostOutEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                        {/* <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
                            <Text fz={"xl"} fw={700}>Heater Temp.
                                <span>
                                    <br />
                                    Lower Limit</span></Text>
                            <Text fz={"xl"} fw={700}>Heater Temp.
                                <span>
                                    <br />
                                    Upper Limit</span></Text>
                        </Flex> */}

                        <Text fz={"xl"} fw={700}>Heater Temperature Lower Limit</Text>
                        {/* <span>
                                <br />
                                Lower Limit</span></Text> */}
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {lowerTempEditing ?
                            <NumberInput
                                hideControls
                                value={postlowerTempTime === 0 ? lowerTempTime : postlowerTempTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostlowerTempTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{lowerTempTime}° C </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setlowerTempEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                        <Text fz={"xl"} fw={700}>Heater Temperature Upper Limit</Text>
                        {/* <span>
                                <br />
                                Upper Limit</span></Text> */}
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {upperTempEditing ?
                            <NumberInput
                                hideControls
                                value={postupperTempTime === 0 ? upperTempTime : postupperTempTime} // Set initial value
                                onChange={
                                    // console.log(fwdTime)
                                    setPostupperTempTime
                                } /> :
                            <Text fz={"xl"} fw={600}>{upperTempTime}° C</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setupperTempEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                        {/* <Flex h={"11rem"} align={"center"}>
                            <Text id="presentwait1" fz={"xl"} fw={600}>124 c</Text>
                        </Flex> */}

                        {/* <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
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
                        </Flex> */}
                        {/* 
                        <Flex direction={"column"} h={"11rem"} justify={"space-between"}>
                            <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                                onClick={() => setlowerTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                            <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                                onClick={() => setupperTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>
                        </Flex> */}

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
                                    <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
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
                                    <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                                        onClick={() => setupperTempEditing(true)} style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>
 */}


                        <Text fz={"xl"} fw={700}>No. Of Cycles</Text>
                        {/* <Text id="presentwait2" fz={"xl"} fw={600}>125 </Text> */}
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
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setcyclesEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                    </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button h={"3rem"} fz={"lg"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                            onClick={() => navigate('/setting3')} pr={9} radius={10}>NEXT <MdArrowRight size={30} /></Button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button disabled={saveStatus ? true : false} radius={10} id="saveButton" onClick={handleSaveButton} fz={"lg"} h={"3rem"} style={{ backgroundColor: saveStatus ? "grey" : "#d10000" }}>SAVE</Button>
                    </div>
                </Grid.Col>
            </Grid>
            {/* </Container>
            </div> */}

            {/* <Flex className="stng1footer" justify={"space-between"} align={"center"}>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} ml={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting1')}>BACK</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} onClick={() => navigate('/')} >HOME</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }} onClick={() => navigate('/setting3')}>NEXT</Button>
                </Flex> */}
            {/* </Flex> */}
        </div>
    )
}

export default Setting_2
