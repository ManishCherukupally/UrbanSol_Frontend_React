import { ActionIcon, Button, Flex, Image, Modal, Text } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import "../style.css"
import { wsUrl } from './config'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import OverlayModal from './OverlayModal'

// const newSocket = new WebSocket(`${wsUrl}?screen=Manual`);
const Manual = () => {
    const [mmfStatus, setmmfStatus] = useState(false)
    const [mmrStatus, setmmrStatus] = useState(false)
    const [blowerStatus, setblowerStatus] = useState(false)
    const [heaterStatus, setheaterStatus] = useState(false)
    const [acrStatus, setacrStatus] = useState(false)

    const [popupStatus, setpopupStatus] = useState(null)
    const [popupMessage, setpopupMessage] = useState("")
    const [popupTime, setpopupTime] = useState("")
    const [websocketError, setwebsocketError] = useState(false)


    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const isMountedRef = useRef(true); // Track if the component is mounted

    const connectWebSocket = () => {
        if (!isMountedRef.current) return; // Prevent connecting if not mounted

        socketRef.current = new WebSocket(`${wsUrl}?screen=Manual`);

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
            console.log(res)
            mainFunction(res)
            setwebsocketError(false)
            setpopupStatus(res.Pop_up)
            setpopupMessage(res.message)
            setpopupTime(res.Time_stamp)
        };

        socketRef.current.onclose = () => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.log("WebSocket connection for Page 1 closed");
            // setIsConnected(false);
            if (isMountedRef.current) attemptReconnect();
        };

        socketRef.current.onerror = (error) => {
            setwebsocketError(true)

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            setpopupTime(dateArray[0].replace("T", " "))

            console.error("WebSocket error on Page 1:", error);
            socketRef.current.close();
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

        console.log(data.MMF);
        function ManualData(data) {
            // console.log(data.MMR)
            // let mmf_data = document.getElementById('mmf_status')
            let mmfstatusbtn = document.getElementById('forward_btn')
            if (data.MMF === 'on') {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "green"
                setmmfStatus(true)
            }
            else if (data.MMF === true) {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "green"
                setmmfStatus(true)
            }
            else if (data.MMF === 1) {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "green"
                setmmfStatus(true)
            }


            else if (data.MMF === 'off') {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "#d10000"
                setmmfStatus(false)
            }
            else if (data.MMF === false) {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "#d10000"
                setmmfStatus(false)
            }

            else if (data.MMF === 0) {
                // mmf_data.textContent = 'ON'
                // mmfstatusbtn.style.background = "#d10000"
                setmmfStatus(false)
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////

            // let mmrstatusbtn = document.getElementById('reverse_btn')
            if (data.MMR === 'on') {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "green"
                setmmrStatus(true)
            }
            else if (data.MMR === true) {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "green"
                setmmrStatus(true)
            }
            else if (data.MMR === 1) {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "green"
                setmmrStatus(true)
            }


            else if (data.MMR === 'off') {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "#d10000"
                setmmrStatus(false)
            }
            else if (data.MMR === false) {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "#d10000"
                setmmrStatus(false)
            }

            else if (data.MMR === 0) {
                // MMR_data.textContent = 'ON'
                // mmrstatusbtn.style.background = "#d10000"
                setmmrStatus(false)
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            if (data.Blower_Motor === true) {
                // blowerStatus.textContent = 'ON'
                // blowerstatusbtn.style.background = "green"
                setblowerStatus(true)
            }
            else if (data.Blower_Motor === 1) {
                // blowerStatus.textContent = 'ON'
                // blowerstatusbtn.style.background = "green"
                setblowerStatus(true)
            }
            else if (data.Blower_Motor === 'on') {
                // blowerStatus.textContent = 'ON'
                // blowerstatusbtn.style.background = "green"
                setblowerStatus(true)
            }

            else if (data.Blower_Motor === 'off') {
                // blowerStatus.textContent = 'OFF'
                // blowerstatusbtn.style.background = "#d10000"
                setblowerStatus(false)
            }
            else if (data.Blower_Motor === false) {
                // blowerStatus.textContent = 'OFF'
                // blowerstatusbtn.style.background = "#d10000"
                setblowerStatus(false)
            }
            else if (data.Blower_Motor === 0) {
                // blowerStatus.textContent = 'OFF'
                // blowerstatusbtn.style.background = "#d10000"
                setblowerStatus(false)
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////


            if (data.Heater === true) {
                // heater_data.textContent = 'ON'
                // heaterstatusbtn.style.background = "green"
                setheaterStatus(true)
            }
            else if (data.Heater === 1) {
                // heater_data.textContent = 'ON'
                // heaterstatusbtn.style.background = "green"
                setheaterStatus(true)
            }
            else if (data.Heater === 'on') {
                // heater_data.textContent = 'ON'
                // heaterstatusbtn.style.background = "green"
                setheaterStatus(true)
            }


            else if (data.Heater === 'off') {
                // heater_data.textContent = 'OFF'
                // heaterstatusbtn.style.background = "#d10000"
                setheaterStatus(false)
            }
            else if (data.Heater === false) {
                // heater_data.textContent = 'OFF'
                // heaterstatusbtn.style.background = "#d10000"
                setheaterStatus(false)
            }
            else if (data.Heater === 0) {
                // heater_data.textContent = 'OFF'
                // heaterstatusbtn.style.background = "#d10000"
                setheaterStatus(false)
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////////////


            if (data.Acr === true) {
                // acr_data.textContent = 'ON'
                // acrstatusbtn.style.background = "green"
                setacrStatus(true)
            }
            else if (data.Acr === 1) {
                // acr_data.textContent = 'ON'
                // acrstatusbtn.style.background = "green"
                setacrStatus(true)
            }
            else if (data.Acr === 'on') {
                // acr_data.textContent = 'ON'
                // acrstatusbtn.style.background = "green"
                setacrStatus(true)
            }


            else if (data.Acr === 'off') {
                // acr_data.textContent = 'OFF'
                // acrstatusbtn.style.background = "#d10000"
                setacrStatus(false)
            }
            else if (data.Acr === false) {
                // acr_data.textContent = 'OFF'
                // acrstatusbtn.style.background = "#d10000"
                setacrStatus(false)
            }
            else if (data.Acr === 0) {
                // acr_data.textContent = 'OFF'
                // acrstatusbtn.style.background = "#d10000"
                setacrStatus(false)
            }
        }
        ManualData(data)
    }


    function ForwardsendMessage() {
        // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = mmfStatus === true ? 0 : 1
        console.log(sendMsg)

        const messageObj = {

            MMF: sendMsg
        }


        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
            console.log(('sent'));
        }


        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function ReversesendMessage() {
        // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = mmrStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            MMR: sendMsg
        }


        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
            console.log(('sent'));
        }


        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function BlowersendMessage() {
        // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = blowerStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Blower_Motor: sendMsg
        }


        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
            console.log(('sent'));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function HeatersendMessage() {
        // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = heaterStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Heater: sendMsg
        }


        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
            console.log(('sent'));
        }


        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function ACRsendMessage() {
        // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = acrStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Acr: sendMsg
        }

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
            console.log(('sent'));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }
    return (
        <div   >
            {/* <Flex direction={"column"} justify={"space-between"}> */}
            {/* <Modal opened={popupStatus} withCloseButton={false} centered closeOnClickOutside={false}>
                {popupMessage}
            </Modal> */}
            {websocketError ? (<OverlayModal status={true} message={"Websocket Connection Error"} time={popupTime} />) : (
                <OverlayModal status={popupStatus} message={popupMessage} time={popupTime} />
            )}


            {/* <div style={{ height: "auto", backgroundColor: "#f1f1f1", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }} > */}
            <Flex direction={"column"} justify={"center"} >
                <Flex justify={'space-around'} align={"center"} p={'1%'}>
                    <Text fw={700} className='motoName'>Main motor</Text>

                    <Button w={"14%"} fz={"xl"} h={"4.5rem"} style={{
                        backgroundColor: mmfStatus ? "green" : "#d10000",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                    }} onClick={ForwardsendMessage} >
                        Forward
                    </Button>

                    <Button w={"14%"} fz={"xl"} h={"4.5rem"} style={{
                        backgroundColor: mmrStatus ? "green" : "#d10000",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                    }} onClick={ReversesendMessage}>
                        Reverse
                    </Button>
                </Flex>

                <Flex justify={'space-between'} align={"center"} p={'2%'} w={'53vw'}>
                    <Text pl={'16%'} fw={700} className='motoName'>Blower</Text>

                    <Button w={"8.5rem"} fz={"xl"} h={"4.5rem"} style={{
                        backgroundColor: blowerStatus ? "green" : "#d10000",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                    }} onClick={BlowersendMessage}>
                        {blowerStatus ? "ON" : "OFF"}
                    </Button>
                </Flex>

                <Flex justify={'space-between'} align={"center"} p={'2%'} w={'53vw'}>
                    <Text pl={'16%'} fw={700} className='motoName'>Heater</Text>

                    <Button w={"8.5rem"} fz={"xl"} h={"4.5rem"} style={{
                        backgroundColor: heaterStatus ? "green" : "#d10000",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                    }} onClick={HeatersendMessage}>
                        {heaterStatus ? "ON" : "OFF"}
                    </Button>
                </Flex>

                <Flex justify={'space-between'} align={"center"} p={'2%'} w={'53vw'}>
                    <Text pl={'16%'} fw={700} className='motoName'>ACR</Text>

                    <Button w={"8.5rem"} fz={"xl"} h={"4.5rem"} style={{
                        backgroundColor: acrStatus ? "green" : "#d10000",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                    }} onClick={ACRsendMessage}>
                        {acrStatus ? "ON" : "OFF"}
                    </Button>
                </Flex>
            </Flex>
            {/* </div> */}


            {/* <div class="manualfooter">
                    <button id="homeButton" style="height: 80%; width:20%; font-size:x-large; background-color:#007AFF; border: none;
                 border-radius: 8px; color:white; font-weight:600;  margin-left:1%">HOME</button>
                    <button style="height: 80%; width:20%; font-size:x-large; background-color: rgb(233, 153, 3); border: none;
                 border-radius: 8px; color:white; font-weight:600; margin-right:1%">NEXT</button>
                </div> */}




            {/* </Flex> */}



        </div>
    )
}

export default Manual
