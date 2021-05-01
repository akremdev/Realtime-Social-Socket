import { useContext, useEffect, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import  './messenger.css'
import axios from 'axios'

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id)
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get("/messages/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);
    return (
        <>
        <Topbar />
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {
                        conversations.map((c) => (
                            <div onClick={()=>setCurrentChat(c)} >
                                <Conversation conversation={c} currentUser= {user} />
                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? ( 
                   <>
                    <div className="chatBoxTop">
                    {
                        messages.map((m) => (
                            <Message message={m} own={m.sender === user._id} />
                        ))
                    }
                    </div>
                    <div className="chatBoxBottom">
                    <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                    <button className="chatSubmitButton">Send</button>
                </div> </> ) : ( <span className="noConversationText">Open a conversation to start a chat.</span>) 
}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
        </>
    )
}
