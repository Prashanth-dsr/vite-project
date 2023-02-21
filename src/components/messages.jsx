import React from 'react';
import {useQuery, gql} from '@apollo/client'
import MessageItem from './messageItem'
import '../styles/messages.css'

const MESSAGE_QUERY = gql`
     {
        messages {
            items {
                id
                subject
                body
            }
        }
    }
`

const Messages = () => {
    const {data, loading, error} = useQuery(MESSAGE_QUERY);

    if(loading) return <p>...loading</p>
    if(error) return <p>{error}</p>

      return (<div>
    <h1 className='heading'>Messages</h1>
    <ul>
        {data && data.messages.items.map((message) => 
            (<MessageItem key={message.id} details={message}/>)
        )}
    </ul>
</div>)
}


export default Messages