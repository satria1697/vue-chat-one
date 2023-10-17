import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ModalInsertName from '../ModalInsertName.vue'

describe('Modal Insert Name', () => {
  it('renders properly', () => {
    const wrapper = mount(ModalInsertName)
    expect(wrapper.classes()).to.contain('fixed')
    expect(wrapper.text()).to.contain('Welcome to Retract Chat')
  })
})
