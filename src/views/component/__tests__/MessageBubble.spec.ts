import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MessageBubble from '../MessageBubble.vue'
import { IMessage } from '../../../entities/message'
import dayjs from 'dayjs'

describe('Message Bubble', () => {
  const isoString = dayjs().toISOString()
  const message: IMessage = {
    message: '',
    sender: 'Test',
    uuid: '',
    time: isoString,
    senderID: ''
  }
  it('renders properly', () => {
    const wrapper = mount(MessageBubble, {
      props: {
        data: message
      }
    })
    expect(wrapper.classes()).to.contain('flex')
    expect(wrapper.find('span').classes()).not.contain('self-end')
    expect(wrapper.findComponent('mi-icon')).toBeTruthy()
    expect(wrapper.text()).to.contain(dayjs(isoString).format('HH:mm'))
    expect(wrapper.text()).to.contain('Test')
  })

  it('add class self-end when isSender equal true', () => {
    const wrapper = mount(MessageBubble, {
      props: {
        data: message,
        isSender: true
      }
    })
    expect(wrapper.classes()).to.contain('flex')
    expect(wrapper.find('span').classes()).to.contain('self-end')
    expect(wrapper.findComponent('mi-icon')).toBeTruthy()
    expect(wrapper.text()).to.contain(dayjs(isoString).format('HH:mm'))
    expect(wrapper.text()).to.contain('Test')
  })
})
