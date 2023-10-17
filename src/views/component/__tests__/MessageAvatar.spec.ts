import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MessageAvatar from '../MessageAvatar.vue'

describe('Message Avatar', () => {
  it('renders properly', () => {
    const wrapper = mount(MessageAvatar)
    expect(wrapper.classes()).to.contain('relative')
    expect(wrapper.findComponent('mi-icon')).toBeTruthy()
  })
})
