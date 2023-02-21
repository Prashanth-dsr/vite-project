import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import PopupContent from './PopupContent';
import '../styles/messageItem.css';


const MessageItem = (props) => {
    const {details} = props;
    const {id, subject, body} = details;

    return (
        <div className='message'>
  <Dialog.Root>
    <div>
        <p><span>Id: </span><br/> {id}</p>
        <p><span>Subject: </span><br/>{subject}</p>
        <p><span>Body: </span><br/>{body}</p>
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
        <div>
          {<PopupContent details={id}/>}
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
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  </div>
);
}

export default MessageItem