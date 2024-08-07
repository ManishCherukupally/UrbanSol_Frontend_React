import React from 'react'
import Input_Output from '../views/Input_Output'
import { AppShell, Button, Flex, Footer, Header, Image, Text, Title } from '@mantine/core'
import { AiFillHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Input_OutputPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <AppShell header={
                <Header className='header' height={"10vh"} style={{ boxShadow: 'rgba(0, 0, 0, 0.45) -6px -15px 9px 13px' }}  >
                    <div >
                        <Image ml={"3%"}
                            style={{ position: "absolute", zIndex: 200 }}
                            mah={80}
                            maw={100}
                            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3UDYwZPTGXmqpEQPSbTpD84a2UmtmMk95Q&s'} />
                        <Flex justify={"center"}   >
                            {/* <h2 style={{ paddingLeft: "2%" }}>DD/MM/YYYY</h2> */}

                            {/* <Text fz={"2rem"} fw={}>MANUAL</Text> */}
                            <Title mt={"0.5rem"}>INPUTS / OUTPUTS</Title>
                            {/* <h2 style={{ paddingRight: "2%", }}>HH:MM:SS</h2> */}
                        </Flex>
                    </div>
                </Header>
            }
                footer={
                    < Footer  >
                        <Flex className="manualfooter" align={"center"}>
                            <Button h={"80%"} ml={"1%"} onClick={() => navigate("/")}>
                                <Flex direction={"column"} justify={"center"} align={"center"}>
                                    <AiFillHome size={"2rem"} />
                                    <Text fz={"lg"}>HOME</Text>
                                </Flex>
                            </Button>
                            {/* <Button h={"80%"} fz={"xl"} fw={600} mr={"1%"} style={{ backgroundColor: 'rgb(233, 153, 3)' }}>NEXT</Button> */}
                        </Flex>
                    </Footer >
                }>
                <Input_Output />
            </AppShell>
        </div>
    )
}

export default Input_OutputPage
