import React, { useState } from 'react';
import { Flex, NumberInput, Text, Button } from '@mantine/core'; // Assuming Chakra UI
import { useDisclosure } from '@mantine/hooks';

function TimeInputConverter() {
    // const [hours, setHours] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);
    // const [totalTimeInSecs, setTotalTimeInSecs] = useState(0);

    // const time = 1000

    // const result = time / 3600
    // console.log(parseInt(result))

    // const result1 = time % 3600
    // console.log(parseInt(result1 / 60))

    // // console.log(parseInt(result1 / 60))

    // console.log(result1 % 60);
    // const convertTimeToSeconds = () => {
    //     const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    //     setTotalTimeInSecs(totalSeconds);


    // };
    const [status, { toggle }] = useDisclosure(true);

    const fun = () => {
        if (status) {
            console.log("hi");
        }
        else {
            console.log("bye");
        }
    }


    return (
        <div>
            <Button onClick={() => {
                toggle()
                fun()
            }
            }>Click</Button>
            <Text>Status her: {JSON.stringify(status)}</Text>
        </div >

        // <Flex gap="0.5rem" align="center">
        //     <NumberInput
        //         h={40}
        //         hideControls
        //         value={hours}
        //         onChange={setHours}
        //         placeholder="Hours"
        //     />
        //     <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
        //     <NumberInput
        //         h={40}
        //         hideControls
        //         value={minutes}
        //         onChange={setMinutes}
        //         placeholder="Minutes"
        //     />
        //     <Text pt="0.5rem" fz="xl" fw={700}>:</Text>
        //     <NumberInput
        //         h={40}
        //         hideControls
        //         value={seconds}
        //         onChange={setSeconds}
        //         placeholder="Seconds"
        //     />
        //     <Button onClick={convertTimeToSeconds}>Save</Button>
        //     {totalTimeInSecs > 0 && (
        //         <Text mt="1rem" fontSize="lg">
        //             Total Time in Seconds: {totalTimeInSecs}
        //         </Text>
        //     )}
        // </Flex>
    );
}

export default TimeInputConverter;
