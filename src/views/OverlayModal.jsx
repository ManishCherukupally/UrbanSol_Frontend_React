import { Button, Center, Flex, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import { PiWarningFill } from 'react-icons/pi';

const OverlayModal = (props) => {
  // const [opened, { open, close }] = useDisclosure(false);
  // const [status, setStatus] = useState(false)

  const { status, message, time } = props

  return (
    <div>

      <Modal opened={status} withCloseButton={false} centered closeOnClickOutside={false} >
        <Group align='end'>
          <PiWarningFill size={46} color='#E99903' />
          <div>

            <Text>{time}</Text>
            <Text>{message}</Text>
          </div>
        </Group>

      </Modal>



    </div>
  )
}

export default OverlayModal
