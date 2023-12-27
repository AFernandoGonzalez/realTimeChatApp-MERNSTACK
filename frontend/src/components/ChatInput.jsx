import './ChatInput.css';

export const ChatInput = ({
    message,
    changeMessageHandler,
    sendMessage,
}) => {
    return (
        <div className='chat-input-section'>
            <div className="input-group mb-3">
                {/* <div className='col'> */}
                    {/* add ... more like images or emojis feature in teh feature */}
                {/* </div> */}
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        aria-label="Message"
                        value={message}
                        onChange={changeMessageHandler}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>


            </div>
        </div>
    )
}