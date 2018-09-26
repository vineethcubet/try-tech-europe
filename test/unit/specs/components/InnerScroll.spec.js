import {mount} from 'avoriaz'
import InnerScroll from '@/components/InnerScroll'

describe('InnerScroll', () => {
  it('stops propagation of wheel events', () => {
    const subject = mount(InnerScroll)

    const event = new Event('wheel')
    sinon.stub(event, 'stopPropagation')

    subject.vm.$el.dispatchEvent(event)

    sinon.assert.calledOnce(event.stopPropagation)
  })
})
