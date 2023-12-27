
export const ChatMessages = ({ receivedMessages }) => (
    <ul className="list-group">
        {receivedMessages.map((message, index) => (
            <li key={index} className={`list-group-item ${message.isSent ? 'list-group-item-primary' : ''}`}>
                <span className="list-group-item list-group-item-secondary">from me: {message.senderUserId} to: {message.recipientUserId}</span>
                <strong>{message.isSent ? 'You:' : message.email + ':'}</strong> {message.message}
            </li>
        ))}
    </ul>
);
