import { Button, Flex, Text } from '@mantine/core'
import React, { useState } from 'react'
import "../style.css"
import { wsUrl } from './config'
const Manual = () => {
    const [mmfStatus, setmmfStatus] = useState(false)
    const [mmrStatus, setmmrStatus] = useState(false)
    const [blowerStatus, setblowerStatus] = useState(false)
    const [heaterStatus, setheaterStatus] = useState(false)
    const [acrStatus, setacrStatus] = useState(false)

    // let url = `ws://192.168.29.144:8765?screen=Manual`

    const socket = new WebSocket(`${wsUrl}?screen=Manual`)



    socket.onmessage = (event) => {
        const res = JSON.parse(event.data)
        console.log(res)

        mainFunction(res)
    }
    socket.onclose = () => {

        console.log('websocket connection closed');
        // setTimeout(websocket, reconnectDelay);

    }
    socket.onerror = (error) => {
        console.log("websocket connection error", error)
    }
    const mainFunction = (data) => {
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


            let blowerStatus = document.getElementById('blowerstatus')
            let blowerstatusbtn = document.getElementById('blower_btn')

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


            let heater_data = document.getElementById('heater_status')
            let heaterstatusbtn = document.getElementById('heaterbt')
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


            let acr_data = document.getElementById('acrSwitchStatus')
            let acrstatusbtn = document.getElementById('acrSwitchbtn')
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
        const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = mmfStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            MMF: sendMsg
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function ReversesendMessage() {
        const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = mmrStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            MMR: sendMsg
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function BlowersendMessage() {
        const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = blowerStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Blower_Motor: sendMsg
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function HeatersendMessage() {
        const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = heaterStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Heater: sendMsg
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }

    function ACRsendMessage() {
        const socket = new WebSocket(`${wsUrl}?screen=Manual`)
        // let statusColor = document.getElementById('forward_btn')
        let sendMsg = acrStatus === true ? 0 : 1
        console.log(sendMsg)
        const messageObj = {

            Acr: sendMsg
        }


        socket.onopen = (event) => {
            // console.log(event)
            console.log("websocket established", event);

            socket.send(JSON.stringify(messageObj));
        }

        // socket.onmessage = (event) => {
        //     const res = JSON.parse(event.data)
        //     status = res.MMF
        //     console.log(status)
        // }
    }
    return (
        <div style={{ height: "100vh" }} >
            <Flex direction={"column"} justify={"space-between"}>
                <div className="header">
                    <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2>
                    <h2>MANUAL</h2>
                    <h2 style={{ paddingRight: "2%" }}>HH:MM:SS</h2>
                </div>

                <div style={{ height: "76vh" }}>
                    <Flex justify={'space-around'} align={"center"} p={'2%'}>
                        <Text fw={600} className='motoName'>Main motor</Text>

                        <Button w={"8.5%"} fz={"xl"} h={"5rem"} style={{
                            backgroundColor: mmfStatus ? "green" : "#d10000",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }} onClick={ForwardsendMessage} >
                            Forward
                        </Button>

                        <Button w={"8.5%"} fz={"xl"} h={"5rem"} style={{
                            backgroundColor: mmrStatus ? "green" : "#d10000",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }} onClick={ReversesendMessage}>
                            Reverse
                        </Button>
                    </Flex>

                    <Flex justify={'space-between'} align={"center"} p={'2%'} w={'52.3vw'}>
                        <Text pl={'23%'} fw={600} className='motoName'>Blower</Text>

                        <Button w={"16%"} fz={"xl"} h={"5rem"} style={{
                            backgroundColor: blowerStatus ? "green" : "#d10000",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }} onClick={BlowersendMessage}>
                            {blowerStatus ? "ON" : "OFF"}
                        </Button>
                    </Flex>

                    <Flex justify={'space-between'} align={"center"} p={'2%'} w={'52.3vw'}>
                        <Text pl={'23%'} fw={600} className='motoName'>Heater</Text>

                        <Button w={"16%"} fz={"xl"} h={"5rem"} style={{
                            backgroundColor: heaterStatus ? "green" : "#d10000",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }} onClick={HeatersendMessage}>
                            {heaterStatus ? "ON" : "OFF"}
                        </Button>
                    </Flex>

                    <Flex justify={'space-between'} align={"center"} p={'2%'} w={'52.3vw'}>
                        <Text pl={'23%'} fw={600} className='motoName'>ACR</Text>

                        <Button w={"16%"} fz={"xl"} h={"5rem"} style={{
                            backgroundColor: acrStatus ? "green" : "#d10000",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }} onClick={ACRsendMessage}>
                            {acrStatus ? "ON" : "OFF"}
                        </Button>
                    </Flex>
                </div>

                {/* <div class="manualfooter">
                    <button id="homeButton" style="height: 80%; width:20%; font-size:x-large; background-color:#007AFF; border: none;
                 border-radius: 8px; color:white; font-weight:600;  margin-left:1%">HOME</button>
                    <button style="height: 80%; width:20%; font-size:x-large; background-color: rgb(233, 153, 3); border: none;
                 border-radius: 8px; color:white; font-weight:600; margin-right:1%">NEXT</button>
                </div> */}


                <Flex className="manualfooter" justify={"space-between"} align={"center"}>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} ml={"1%"}>HOME</Button>
                    <Button h={"80%"} w={"20%"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}>NEXT</Button>
                </Flex>

            </Flex>



        </div>
    )
}

export default Manual
