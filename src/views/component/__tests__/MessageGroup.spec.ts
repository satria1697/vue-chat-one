import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MessageGroup from '../MessageGroup.vue'
import { IMessage } from '../../../entities/message'
import dayjs from 'dayjs'

describe('Message Bubble', () => {
  const isoString = dayjs().toISOString()
  const message: IMessage = {
    message: '',
    sender: 'Test',
    uuid: '',
    time: isoString,
    senderID: 'test-sender-id'
  }
  it('Render Avatar on the right when sender ID is same as the sender', () => {
    const wrapper = mount(MessageGroup, {
      props: {
        senderId: 'test-sender-id',
        data: message
      }
    })
    expect(wrapper.classes()).to.contain('grid-cols-[1fr,2.5rem]')
    expect(wrapper.findComponent('message-bubble')).toBeTruthy()
    expect(wrapper.text()).to.contain('Test')
  })

  it('Render Avatar on the left when sender ID is different as the sender', () => {
    const wrapper = mount(MessageGroup, {
      props: {
        senderId: 'another-sender-id',
        data: message
      }
    })
    expect(wrapper.classes()).to.contain('grid-cols-[2.5rem,1fr]')
    expect(wrapper.findComponent('message-bubble')).toBeTruthy()
    expect(wrapper.text()).to.contain('Test')
  })
})
