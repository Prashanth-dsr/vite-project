import '../styles/messages.css';

const MESSAGES = new Array(100)

for(let i = 0; i < 100; i++) {
    MESSAGES[i] = {
        id: i,
        subject: `message ${i}`,
        body: `This is message ${i}`,
        view_count: Math.ceil(Math.random() * 100)
    }
}

const Messages = () => (
    <div>
        <h1>Messages</h1>
        <ul>
            {MESSAGES.map(message => <li key={message.id}>
                <h3>{message.subject}</h3>
                <p>{message.body}</p>
                <p>views: {message.view_count}</p>
            </li>)}
        </ul>
    </div>
)

export default Messages