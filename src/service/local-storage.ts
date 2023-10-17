import { IMessage } from '@/entities/message'

export default class LocalStorage {
  key = 'message'

  getAllMessage(page = 1): { data: Array<IMessage>; isLoadMore: boolean } {
    const numberOfData = page * 25
    const data: Array<IMessage> = JSON.parse(localStorage.getItem(this.key) ?? '[]')
    return {
      data: data.reverse().slice(0, numberOfData).reverse(),
      isLoadMore: data.length > numberOfData
    }
  }

  getMessageFromUser(user: string): Array<IMessage> {
    const value: Array<IMessage> = JSON.parse(localStorage.getItem(this.key) ?? '[]')
    return value.filter((value) => value.sender === user)
  }

  addMessage(message: IMessage) {
    const messages = this.getAllMessage().data
    messages.push(message)
    localStorage.setItem(this.key, JSON.stringify(messages))
  }
}
