import './message.css'
import {format} from "timeago.js"

export default function Message({own, message}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://media-exp1.licdn.com/dms/image/C5603AQEln4kyQcjrtA/profile-displayphoto-shrink_200_200/0/1597177296578?e=1623888000&v=beta&t=YrmMLVHn9KbiJ1dwZXlbQzB3HACrWX70RRzS9eOBdI4" alt=""
                />
                <p className="messageText">{message.text}</p>    
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
