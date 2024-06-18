// import React, { useState } from 'react';
// import { Flex, NumberInput, Text, Button } from '@mantine/core'; // Assuming Chakra UI
// import { useDisclosure } from '@mantine/hooks';

// function TimeInputConverter() {
//     // const [hours, setHours] = useState(0);
//     // const [minutes, setMinutes] = useState(0);
//     // const [seconds, setSeconds] = useState(0);
//     // const [totalTimeInSecs, setTotalTimeInSecs] = useState(0);

//     // const time = 1000

//     // const result = time / 3600
//     // console.log(parseInt(result))

//     // const result1 = time % 3600
//     // console.log(parseInt(result1 / 60))

//     // // console.log(parseInt(result1 / 60))

//     // console.log(result1 % 60);
//     // const convertTimeToSeconds = () => {
//     //     const totalSeconds = hours * 3600 + minutes * 60 + seconds;
//     //     setTotalTimeInSecs(totalSeconds);


//     // };
//     const [status, { toggle }] = useDisclosure(true);

//     const fun = () => {
//         if (status) {
//             console.log("hi");
//         }
//         else {
//             console.log("bye");
//         }
//     }


//     return (
//         <div>
//             <Button onClick={() => {
//                 toggle()
//                 fun()
//             }
//             }>Click</Button>
//             <Text>Status her: {JSON.stringify(status)}</Text>
//         </div >

//         // <Flex gap="0.5rem" align="center">
//         //     <NumberInput
//         //         h={40}
//         //         hideControls
//         //         value={hours}
//         //         onChange={setHours}
//         //         placeholder="Hours"
//         //     />
//         //     <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
//         //     <NumberInput
//         //         h={40}
//         //         hideControls
//         //         value={minutes}
//         //         onChange={setMinutes}
//         //         placeholder="Minutes"
//         //     />
//         //     <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
//         //     <NumberInput
//         //         h={40}
//         //         hideControls
//         //         value={seconds}
//         //         onChange={setSeconds}
//         //         placeholder="Seconds"
//         //     />
//         //     <Button onClick={convertTimeToSeconds}>Save</Button>
//         //     {totalTimeInSecs > 0 && (
//         //         <Text mt="1rem" fontSize="lg">
//         //             Total Time in Seconds: {totalTimeInSecs}
//         //         </Text>
//         //     )}
//         // </Flex>
//     );
// }

// export default TimeInputConverter;
// import React, { useState } from 'react'
// import OverlayModal from './OverlayModal'
// import { Modal } from '@mantine/core'
// import { wsUrl } from './config'

// const Dummy = () => {
//     const [status, setStatus] = useState(true)
//     // const socket = new WebSocket(`${wsUrl}?screen=Manual`)
//     const [popupStatus, setpopupStatus] = useState(true)
//     const [popupMessage, setpopupMesaage] = useState("")
//     const [previousPopupStatus, setpreviousPopupStatus] = useState(false)

//     // console.log(previousPopupStatus)

//     // useEffect(() => {
//     //     if (previousPopupStatus) {
//     //         setpopupStatus(true);
//     //     }
//     //     else if (previousPopupStatus === false) {
//     //         setpopupStatus(false)
//     //     }

//     // }, [previousPopupStatus])
//     const socket = new WebSocket(`${wsUrl}?screen=Manual`)
//     socket.onmessage = (event) => {
//         const res = JSON.parse(event.data)
//         // console.log(res)
//         if (res === null) {
//             setpopupMesaage("")
//         } else {
//             setpopupMesaage(res.message)
//         }

//         // const currentPopupStatus = res.Pop_up;

//         // if (previousPopupStatus !== currentPopupStatus) {
//         //     // Update pop-up status only if it has changed
//         //     setpopupMesaage(res.message);
//         //     setpopupStatus(currentPopupStatus);
//         //     setpreviousPopupStatus(currentPopupStatus)
//         // }

//         // mainFunction(res)
//     }
//     //   const { status, message } = props

//     return (
//         <div>

//             <Modal opened={status} withCloseButton={false} centered closeOnClickOutside={false}>
//                 {/* {message} */} hii
//             </Modal>



//         </div>
//     )

// }

// export default Dummy

// import { Text } from '@mantine/core';
// import React, { useState } from 'react'

// const Dummy = () => {
//     // console.log("hii")
//     const [ip, setIp] = useState("")

//     const pc = new RTCPeerConnection({ iceServers: [] });
//     const noop = function () { };

//     pc.onicecandidate = function (ice) {
//         if (ice && ice.candidate && ice.candidate.candidate) {
//             const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
//             console.log('Your IP address:', myIP);
//             setIp(myIP)
//             pc.onicecandidate = noop;
//         }
//     };

//     // Create a bogus data channel (optional)
//     pc.createDataChannel("");
//     pc.createOffer().catch(noop);



//     return (
//         <div>
//             <Text>Ip address : {ip}</Text>
//         </div>
//     )
// }

// export default Dummy



import React, { useEffect, useState } from 'react'
import { wsUrl } from './config';
import { Link, useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Indicator } from '@mantine/core';
import { MdNotifications } from 'react-icons/md';

const Dummy = () => {
    const navigate = useNavigate()
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket(`${wsUrl}?screen=Manual`);
        const websocket = (socket) => {
            const Socket = socket
            // const newSocket = new WebSocket(`${wsUrl}?screen=Manual`); // Replace with your URL
            // newSocket.close()
            Socket.onopen = () => {
                console.log('WebSocket connection opened');
                setSocket(newSocket);
            };

            Socket.onmessage = (event) => {
                const res = JSON.parse(event.data)
                console.log(res)
            }
            Socket.onclose = () => {
                setTimeout(() => {
                    const sock = newSocket
                    websocket(sock)
                    console.log("connecting...");
                }, 1000)
            }
        }
        websocket(newSocket)
        return () => {
            if (newSocket) {
                newSocket.close();
                console.log('WebSocket connection closed');
            }
        };
    }, []);

    return (
        <div style={{ margin: "10rem" }}>
            {/* <Link to="/">
                click here
            </Link> */}
            {/* <Button onClick={() => navigate('/')}>Click here</Button> */}
            <Indicator color="red" position="top-start" size={20} processing>
                <MdNotifications size={"4rem"} color='grey' style={{ position: "absolute", zIndex: 10 }} />
            </Indicator>
        </div>
    )
}

export default Dummy


