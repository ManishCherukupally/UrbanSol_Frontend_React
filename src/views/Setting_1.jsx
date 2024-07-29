import { Button, Card, Container, Drawer, Flex, Grid, Group, ScrollArea, SimpleGrid, Space, Text, TextInput } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import { wsUrl } from './config';
import { MdArrowRight } from 'react-icons/md';
import OverlayModal from './OverlayModal';
import NumPad from '../Numpad';

const Setting_1 = () => {
    const [inputs, setInputs] = useState({
        getTcHours: '',
        getTcMinutes: '',
        getTcSeconds: '',
        fwdTime: '',
        wait1Time: '',
        revTime: '',
        wait2Time: '',
        getwaitCycleHours: '',
        getwaitCycleMinutes: '',
        getwaitCycleSeconds: ''
    });
    const [activeField, setActiveField] = useState(null);
    const [numPadopened, setnumPadOpened] = useState(false);

    const handleInputClick = (field) => {
        setActiveField(field);
        setnumPadOpened(true);
    };

    const handleButtonClick = (value) => {
        if (value === 'backspace') {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [activeField]: typeof prevInputs[activeField] === 'string' ? prevInputs[activeField].slice(0, -1) : '',
            }));
        } else if (value === 'enter') {
            setnumPadOpened(false);
            setActiveField(null);
        } else {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [activeField]: typeof prevInputs[activeField] === 'string' ? prevInputs[activeField] + value : value,
            }));
        }
    };


    const navigate = useNavigate();

    const numpadRef = useRef(null);

    const [saveStatus, setSaveStatus] = useState(true);

    const [tcEditing, setTcEditing] = useState(false);

    const [fwdEditing, setfwdEditing] = useState(false);
    const [postfwdTime, setPostfwdTime] = useState(0);

    const [wait1Editing, setwait1Editing] = useState(false);
    const [postwait1Time, setPostwait1Time] = useState(0);

    const [revEditing, setrevEditing] = useState(false);
    const [postrevTime, setPostrevTime] = useState(0);

    const [wait2Editing, setwait2Editing] = useState(false);
    const [postwait2Time, setPostwait2Time] = useState(0);

    const [waitCycleEditing, setwaitCycleEditing] = useState(false);

    const [popupStatus, setpopupStatus] = useState(null);
    const [popupMessage, setpopupMessage] = useState("");
    const [popupTime, setpopupTime] = useState("");
    const [websocketError, setwebsocketError] = useState(false);
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const isMountedRef = useRef(true); // Track if the component is mounted

    const connectWebSocket = () => {
        if (!isMountedRef.current) return; // Prevent connecting if not mounted

        socketRef.current = new WebSocket(`${wsUrl}?screen=Settings`);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection for Page 1 established");
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };

        socketRef.current.onmessage = (event) => {
            const res = JSON.parse(event.data);
            mainFunction(res);
            setwebsocketError(false);
            setpopupStatus(res.Pop_up);
            setpopupMessage(res.message);
            setpopupTime(res.Time_stamp);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection closed");
            // attemptReconnect();
        };

        socketRef.current.onerror = (error) => {
            setwebsocketError(true);
            var date = new Date();
            var dateArray = date.toISOString().split(".");
            setpopupTime(dateArray[0].replace("T", " "));
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
        setInputs({
            getTcHours: parseInt(data.total_cycle_time / 3600),
            getTcMinutes: parseInt((data.total_cycle_time % 3600) / 60),
            getTcSeconds: parseInt((data.total_cycle_time % 3600) % 60),
            fwdTime: data.motor_fwd_time,
            wait1Time: data.fwd_wait_time,
            revTime: data.motor_rev_time,
            wait2Time: data.rev_wait_time,
            getwaitCycleHours: parseInt(data.wait_time_in_cycles / 3600),
            getwaitCycleMinutes: parseInt((data.wait_time_in_cycles % 3600) / 60),
            getwaitCycleSeconds: parseInt((data.wait_time_in_cycles % 3600) % 60)
        });
    };

    const handleSaveButton = () => {
        setTcEditing(false);
        setfwdEditing(false);
        setwait1Editing(false);
        setrevEditing(false);
        setwait2Editing(false);
        setwaitCycleEditing(false);

        const TCtotalSeconds = parseInt(inputs.getTcHours) * 3600 + parseInt(inputs.getTcMinutes) * 60 + parseInt(inputs.getTcSeconds);
        const WaitCycletotalSeconds = parseInt(inputs.getwaitCycleHours) * 3600 + parseInt(inputs.getwaitCycleMinutes) * 60 + parseInt(inputs.getwaitCycleSeconds);
        const messageObj = {
            total_cycle_time: TCtotalSeconds,
            motor_fwd_time: postfwdTime === 0 ? parseInt(inputs.fwdTime) : postfwdTime,
            fwd_wait_time: postwait1Time === 0 ? parseInt(inputs.wait1Time) : postwait1Time,
            motor_rev_time: postrevTime === 0 ? parseInt(inputs.revTime) : postrevTime,
            rev_wait_time: postwait2Time === 0 ? parseInt(inputs.wait2Time) : postwait2Time,
            wait_time_in_cycles: WaitCycletotalSeconds
        };

        socketRef.current = new WebSocket(`${wsUrl}?screen=Settings`);

        socketRef.current.onopen = (event) => {
            console.log("WebSocket established", event);
            socketRef.current.send(JSON.stringify(messageObj));
        };

        socketRef.current.onmessage = (event) => {
            const res = JSON.parse(event.data);
            mainFunction(res);
            setwebsocketError(false);
            setpopupStatus(res.Pop_up);
            setpopupMessage(res.message);
            setpopupTime(res.Time_stamp);
        };

        socketRef.current.onclose = (event) => {
            console.log("WebSocket closed", event);
        };

        socketRef.current.onerror = (error) => {
            setwebsocketError(true);
            console.error("WebSocket error:", error);
            socketRef.current.close();
        };
    };
    // const handleTcTimeChange = (event) => {
    //     setTcTime(event.currentTarget.value);
    // };
    return (
        <div style={{ height: "120vh" }} >
            {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
            )}
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
                                <TextInput
                                    // ref={numpadRef}
                                    max={24}
                                    min={0}
                                    h={40}
                                    // hideControls
                                    value={inputs.getTcHours}
                                    onClick={() => handleInputClick('getTcHours')}
                                    placeholder="Hours"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <TextInput
                                    // ref={numpadRef}
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={inputs.getTcMinutes}
                                    onClick={() => handleInputClick('getTcMinutes')}
                                    placeholder="Minutes"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <TextInput
                                    // ref={numpadRef}
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={inputs.getTcSeconds}
                                    onClick={() => handleInputClick('getTcSeconds')}
                                    placeholder="Seconds"
                                />

                            </Flex>
                            // <TextInput
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
                                    <Text fz={"xl"} fw={600}>{inputs.getTcHours}</Text>
                                    <Text fz={"xl"} fw={600}>H </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"center"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{inputs.getTcMinutes}</Text>
                                    <Text fz={"xl"} fw={600}>M </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"center"} gap={3}>
                                    <Text fz={"xl"} fw={600}>{inputs.getTcSeconds}</Text>

                                    <Text fz={"xl"} fw={600}>S</Text>
                                </Flex>
                            </Group>
                        }

                        <Button h={"3rem"} w={"5rem"} c={"black"} style={{ backgroundColor: "#e1e1e1" }}
                            onClick={() => {
                                setTcEditing(true)
                                setSaveStatus(false)
                            }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Forward Motor Time</Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {fwdEditing ?
                            <TextInput
                                hideControls
                                value={postfwdTime === 0 ? inputs.fwdTime : postfwdTime} // Set initial value
                                onClick={() => handleInputClick('fwdTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.fwdTime} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setfwdEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Wait Time (Forward)</Text>
                        {/* <Text id="presentwait1" fz={"xl"} fw={600}>12 : 12 Hrs</Text> */}
                        {wait1Editing ?
                            <TextInput
                                hideControls
                                value={postwait1Time === 0 ? inputs.wait1Time : postwait1Time} // Set initial value
                                onClick={() => handleInputClick('wait1Time')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.wait1Time} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setwait1Editing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Reverse Motor Time</Text>
                        {/* <Text id="presentrevTime" fz={"xl"} fw={600}>130 Sec</Text> */}
                        {revEditing ?
                            <TextInput
                                hideControls
                                value={postrevTime === 0 ? inputs.revTime : postrevTime} // Set initial value
                                onClick={() => handleInputClick('revTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.revTime} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setrevEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Wait Time (Reverse)</Text>
                        {/* <Text id="presentwait2" fz={"xl"} fw={600}>125 Sec</Text> */}
                        {wait2Editing ?
                            <TextInput
                                hideControls
                                value={postwait2Time === 0 ? inputs.wait2Time : postwait2Time} // Set initial value
                                onClick={() => handleInputClick('wait2Time')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.wait2Time} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setwait2Editing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



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
                                <TextInput
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={inputs.getwaitCycleHours}
                                    onClick={() => handleInputClick('getwaitCycleHours')}
                                    placeholder="Hours"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <TextInput
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={inputs.getwaitCycleMinutes}
                                    onClick={() => handleInputClick('getwaitCycleMinutes')}
                                    placeholder="Minutes"
                                />
                                <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
                                <TextInput
                                    max={59}
                                    min={0}
                                    h={40}
                                    hideControls
                                    value={inputs.getwaitCycleSeconds}
                                    onClick={() => handleInputClick('getwaitCycleSeconds')}
                                    placeholder="Seconds"
                                />

                            </Flex>
                            :
                            <Group>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{inputs.getwaitCycleHours}</Text>
                                    <Text fz={"xl"} fw={600}>H </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{inputs.getwaitCycleMinutes}</Text>
                                    <Text fz={"xl"} fw={600}>M </Text>
                                    <Text fz={"xl"} fw={600}>:</Text>
                                </Flex>
                                <Flex align={"baseline"} gap={10}>
                                    <Text fz={"xl"} fw={600}>{inputs.getwaitCycleSeconds}</Text>

                                    <Text fz={"xl"} fw={600}>S</Text>
                                </Flex>
                            </Group>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setwaitCycleEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>

                    </SimpleGrid>

                </Grid.Col>
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button radius={10} h={"3rem"} fz={"lg"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                            onClick={() => navigate('/setting2')} pr={9}>NEXT <MdArrowRight size={30} /></Button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button disabled={saveStatus ? true : false} radius={10} id="saveButton" onClick={handleSaveButton} fz={"lg"} h={"3rem"} style={{ backgroundColor: saveStatus ? "grey" : "#d10000" }}>SAVE</Button>
                    </div>
                </Grid.Col>
            </Grid>

            <Drawer withCloseButton={false} position='bottom' size={'xxs'} opened={numPadopened} onClose={() => setnumPadOpened(false)} >
                <NumPad onButtonClick={handleButtonClick} />
            </Drawer>
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
