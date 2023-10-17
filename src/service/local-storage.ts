import { IMessage } from '@/entities/message'

export default class LocalStorage {
  key = 'message'

  getAllMessage(): Array<IMessage> {
    const data: Array<IMessage> = JSON.parse(localStorage.getItem(this.key) ?? '[]')
    return data.reverse().slice(0, 25).reverse()
  }

  getMessageFromUser(user: string): Array<IMessage> {
    const value: Array<IMessage> = JSON.parse(localStorage.getItem(this.key) ?? '[]')
    return value.filter((value) => value.sender === user)
  }

  addMessage(message: IMessage) {
    const messages = this.getAllMessage()
    messages.push(message)
    localStorage.setItem(this.key, JSON.stringify(messages))
  }
}
