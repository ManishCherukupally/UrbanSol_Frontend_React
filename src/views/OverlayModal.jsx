import { Button, Center, Flex, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'

const OverlayModal = (props) => {
  // const [opened, { open, close }] = useDisclosure(false);
  // const [status, setStatus] = useState(false)

  const { status, message } = props

  return (
    <div>

      <Modal opened={status} withCloseButton={false} centered closeOnClickOutside={false}>
        {message}
      </Modal>



    </div>
  )
}

export default OverlayModal
