import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Drawer, Flex, Grid, Group, NumberInput, SimpleGrid, Space, Text, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { wsUrl } from './config';
import { MdArrowLeft } from 'react-icons/md';
import OverlayModal from './OverlayModal';
import NumPad from '../Numpad';
const Setting_3 = () => {
    // let url = `ws://192.168.29.144:8765?screen=Settings`

    // const socket = new WebSocket(`${wsUrl}?screen=Settings`);
    // const socketRef = useRef(null);  // Store WebSocket reference

    // socketRef.current = socket;  // Assign socket to reference
    const [inputs, setInputs] = useState({
        heaterTemp: '',
        overLoadTime: '',
        crusherStartTime: '',
        crusherRevTime: '',
        currentFreqTime: '',

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


    const navigate = useNavigate()

    const [saveStatus, setSaveStatus] = useState(true)

    const [heaterEditing, setheaterEditing] = useState(false);
    // const [heaterTemp, setheaterTemp] = useState(0);
    const [postHeater, setPostHeater] = useState(0)
    // console.log(postHeater)
    const [overLoadEditing, setoverLoadEditing] = useState(false);
    // const [overLoadTime, setoverLoadTime] = useState(0);
    const [postoverLoadTime, setPostoverLoadTime] = useState(0)

    const [crusherStartEditing, setcrusherStartEditing] = useState(false);
    // const [crusherStartTime, setcrusherStartTime] = useState(0);
    const [postcrusherStartTime, setPostcrusherStartTime] = useState(0)

    const [crusherRevEditing, setcrusherRevEditing] = useState(false);
    // const [crusherRevTime, setcrusherRevTime] = useState(0);
    const [postcrusherRevTime, setPostcrusherRevTime] = useState(0)

    const [currentFreqEditing, setcurrentFreqEditing] = useState(false);
    // const [currentFreqTime, setcurrentFreqTime] = useState(0);
    const [postcurrentFreqTime, setPostcurrentFreqTime] = useState(0)

    // const socket = new WebSocket(`${wsUrl}?screen=Settings`)
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
        // setheaterTemp(data.heater_temp_cut_off)
        // setoverLoadTime(data.overload_current_time)
        // setcrusherStartTime(data.delay_time_for_crusher_start)
        // setcrusherRevTime(data.delay_time_for_crusher_rev)
        // setcurrentFreqTime(data.crusher_freq)

        setInputs({
            heaterTemp: data.heater_temp_cut_off,
            overLoadTime: data.overload_current_time,
            crusherStartTime: data.delay_time_for_crusher_start,
            crusherRevTime: data.delay_time_for_crusher_rev,
            currentFreqTime: data.crusher_freq,
        })
    }

    const handleSaveButton = () => {
        setheaterEditing(false)
        setoverLoadEditing(false)
        setcrusherStartEditing(false)
        setcrusherRevEditing(false)
        setcurrentFreqEditing(false)

        const messageObj = {

            heater_temp_cut_off: postHeater === 0 ? parseFloat(inputs.heaterTemp) : postHeater,
            overload_current_time: postoverLoadTime === 0 ? parseInt(inputs.overLoadTime) : postoverLoadTime,
            delay_time_for_crusher_start: postcrusherStartTime === 0 ? parseInt(inputs.crusherStartTime) : postcrusherStartTime,
            delay_time_for_crusher_rev: postcrusherRevTime === 0 ? parseInt(inputs.crusherRevTime) : postcrusherRevTime,
            crusher_freq: postcurrentFreqTime === 0 ? parseInt(inputs.currentFreqTime) : postcurrentFreqTime

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
        <div style={{ height: "125vh" }}>
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
                            <TextInput
                                hideControls
                                value={postHeater === 0 ? inputs.heaterTemp : postHeater} // Set initial value
                                onClick={() => handleInputClick('heaterTemp')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.heaterTemp}° C </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setheaterEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                        <Text fz={"xl"} fw={700}>Overload Current  Limit
                        </Text>
                        {/* <Text id="presentfwdTime" fz={"xl"} fw={600}>120 A</Text> */}
                        {overLoadEditing ?
                            <TextInput
                                hideControls
                                value={postoverLoadTime === 0 ? inputs.overLoadTime : postoverLoadTime} // Set initial value
                                onClick={() => handleInputClick('overLoadTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.overLoadTime} A </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setoverLoadEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Delay Time For Crusher Start After OL
                        </Text>
                        {/* <Text id="presentwait1" fz={"xl"} fw={600}>124 Sec</Text> */}
                        {crusherStartEditing ?
                            <TextInput
                                hideControls
                                value={postcrusherStartTime === 0 ? inputs.crusherStartTime : postcrusherStartTime} // Set initial value
                                onClick={() => handleInputClick('crusherStartTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.crusherStartTime} Sec </Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setcrusherStartEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Delay Time For Crusher Reverse After OL
                        </Text>
                        {/* <Text id="presentrevTime" fz={"xl"} fw={600}>130 Sec</Text> */}
                        {crusherRevEditing ?
                            <TextInput
                                hideControls
                                value={postcrusherRevTime === 0 ? inputs.crusherRevTime : postcrusherRevTime} // Set initial value
                                onClick={() => handleInputClick('crusherRevTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.crusherRevTime} Sec</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setcrusherRevEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>



                        <Text fz={"xl"} fw={700}>Crusher Frequency</Text>
                        {/* <Text id="presentwait2" fz={"xl"} fw={600}>125 Hz</Text> */}
                        {currentFreqEditing ?
                            <TextInput
                                hideControls
                                value={postcurrentFreqTime === 0 ? inputs.currentFreqTime : postcurrentFreqTime} // Set initial value
                                onClick={() => handleInputClick('currentFreqTime')} /> :
                            <Text fz={"xl"} fw={600}>{inputs.currentFreqTime} Hz</Text>
                        }
                        <Button id="fwdEdit" h={"3rem"} w={"5rem"} c={"black"}
                            onClick={() => {
                                setcurrentFreqEditing(true)
                                setSaveStatus(false)
                            }
                            } style={{ backgroundColor: "#e1e1e1" }}>Edit</Button>


                    </SimpleGrid>

                </Grid.Col>
                <Grid.Col span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button h={"3rem"} fz={"lg"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}
                            onClick={() => navigate('/setting3')}>NEXT</Button>
                    </div> */}

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button disabled={saveStatus ? true : false} radius={10} id="saveButton" onClick={handleSaveButton} fz={"lg"} h={"3rem"} style={{ backgroundColor: saveStatus ? "grey" : "#d10000" }}>SAVE</Button>
                    </div>
                </Grid.Col>
            </Grid>

            <Drawer withCloseButton={false} position='bottom' size={'xxs'} opened={numPadopened} onClose={() => setnumPadOpened(false)} >
                <NumPad onButtonClick={handleButtonClick} />
            </Drawer>
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
