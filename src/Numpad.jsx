// src/NumberPad.js
import React from 'react';
import { Button, Grid } from '@mantine/core';
import { MdBackspace } from 'react-icons/md';
// import { IoMdBackspace } from "react-icons/io";


const NumPad = ({ onButtonClick }) => {
    const buttons = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '0', value: '0' },
        { label: '.', value: '.' },
        { label: <MdBackspace />, value: 'backspace' },
        // { label: 'Enter', value: 'enter' },
    ];

    return (
        <Grid grow>
            {buttons.map((button) => (
                <Grid.Col span={1} key={button.value}>
                    <Button
                        fullWidth
                        variant="outline"
                        onClick={() => onButtonClick(button.value)}
                    >
                        {button.label}
                    </Button>
                </Grid.Col>
            ))}
            {/* <Grid.Col span={6}>
                <Button
                    fullWidth
                    color="red"
                    variant="filled"
                    onClick={() => onButtonClick('backspace')}
                >
                    Backspace
                </Button>
            </Grid.Col> */}
            <Grid.Col span={6}>
                <Button
                    fullWidth
                    color="green"
                    variant="filled"
                    onClick={() => onButtonClick('enter')}
                >
                    Enter
                </Button>
            </Grid.Col>
        </Grid>
    );
};

export default NumPad;
