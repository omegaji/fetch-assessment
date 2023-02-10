import React from 'react'

const FeedbackMessage = (props) => {

    if (props.type === "error") {
        return (
            <div className='feedback error-message'>
                ⚠️{props.message}
                <button onClick={props.handleFeedback.bind(this, "type", "none")} className='message-toggle'>X</button>
            </div>
        )
    }
    else if (props.type === "success") {
        return (
            <div className='feedback success-message'>
                {props.message}
                <button onClick={props.handleFeedback.bind(this, "type", "none")} className='message-toggle'>X</button>
            </div>
        )
    }
    else if (props.type === "none") {
        return
    }
}

export default FeedbackMessage