import React from 'react';
import { useQuery, gql } from '@apollo/client';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import '../styles/messageItem.css';

const ITEM_QUERY = gql`
  query ItemQuery($id: String!) {
    message(id: $id) {
      id
      author {
        login
      }
      subject
      body
      language
      metrics {
        views
      }
      view_href
      post_time
    }
  }
`;

const MessageItem = (props) => {
    const {details} = props

    const {data} = useQuery(ITEM_QUERY,{
      variables: {
        id: details.id
      }
    })

    const renderPopup = () => {
      const {message} = data;
      const {id, author, subject, body, language, metrics, view_href, post_time} = message;

      return <>
        <Dialog.Description className="DialogDescription text-color">
              <span>id: </span>{id}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>author: </span>{author.login}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription">
              <span>subject: </span>{subject}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>body: </span>{body}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>language: </span>{language}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>views: </span>{metrics.views}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>link: </span>{view_href}
          </Dialog.Description>
          <Dialog.Description className="DialogDescription text-color">
              <span>post time: </span>{post_time}
          </Dialog.Description>
      </>
    }


    return (
        <div className='message'>
  <Dialog.Root>
    <div>
        <p><span>id: </span> {details.id}</p>
        <p><span>subject: </span>{details.subject}</p>
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
          {data && renderPopup()}
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