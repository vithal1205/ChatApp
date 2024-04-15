import {Component} from 'react'
import {BsPeople, BsEmojiSmile} from 'react-icons/bs'
import {v4} from 'uuid'
import Picker from 'emoji-picker-react'
import Popup from 'reactjs-popup'
import UserMessage from '../UserMessage'

import './index.css'

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

class ChatHome extends Component {
  state = {list: [], message: ''}

  onChangeValue = event => {
    this.setState({message: event.target.value})
  }

  onEmojiClick = (event) => {
    const {message} = this.state
    console.log(event.emoji)
    const emojiMessage = message + event.emoji
    this.setState({message: emojiMessage})
  }

  onSendMsg = event => {
    const {message} = this.state
    const time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const index = Math.ceil(Math.random() * userList.length) - 1
    const user = userList[index]
    const initial = user[0]

    if (event.key === 'Enter' && message !== '') {
      const newMessage = {
        id: v4(),
        userMessage: message,
        hour,
        minutes,
        user,
        initial,
      }

      this.setState(prevState => ({
        list: [...prevState.list, newMessage],
        message: '',
      }))
    }
  }

  render() {
    const {message, list, emojiObject} = this.state
    console.log(emojiObject)

    return (
      <div className="chat-section">
        <div className="header-section">
          <div className="header-content">
            <h1 className="head-intro">Introductions</h1>
            <p className="desc">This Channel is For Company Wide Chatter</p>
          </div>
          <div className="count-section">
            <p className="count">3 | 100</p>
            <BsPeople className="people-icon" />
          </div>
        </div>
        <hr className="hr-line" />
        <ul className="user-enter-msg-container">
          {list.map(each => (
            <UserMessage key={each.id} userEnterMessage={each} />
          ))}
        </ul>
        <div className="msg-container">
          <input
            type="text"
            placeholder="Text Message"
            className="msg-input"
            value={message}
            onChange={this.onChangeValue}
            onKeyDown={this.onSendMsg}
          />
          <Popup
            trigger={
              <button type="button" className="emoji-button">
                <BsEmojiSmile className="emoji" />
              </button>
            }
            position="top right"
          >
            <Picker onEmojiClick={this.onEmojiClick} />
          </Popup>
        </div>
      </div>
    )
  }
}

export default ChatHome
