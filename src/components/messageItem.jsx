import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import '../styles/messageItem.css';

const MessageItem = (props) => {
    const {message} = props
    const {id, subject, body} = message

    return (
        <div className='message'>
  <Dialog.Root>
    <div>
        <p><span>id: </span> {id}</p>
        <h3><span>subject: </span>{subject}</h3>
        <p><span>body: </span>{body}</p>
    </div>
    <Dialog.Trigger asChild>
      <button className="Button violet" size="large">
        View Message
      </button>
    </Dialog.Trigger>
    <Dialog.Portal className='bg-color'>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Message</Dialog.Title>
        <Dialog.Description className="DialogDescription text-color">
            <span>id: </span>{id}
        </Dialog.Description>
        <Dialog.Description className="DialogDescription text-color">
            <span>subject: </span>{subject}
        </Dialog.Description>
        <Dialog.Description className="DialogDescription">
            <span>body: </span>{body}
        </Dialog.Description>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Back</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  </div>
);
}

export default MessageItem