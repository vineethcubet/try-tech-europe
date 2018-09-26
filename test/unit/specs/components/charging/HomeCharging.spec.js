import {shallow} from 'avoriaz'
import HomeCharging from '@/components/charging/home/HomeCharging'

describe('HomeCharging.js', () => {
  let subject

  beforeEach(() => {
    subject = shallow(HomeCharging)
  })

  it('should not show learn more section by default', () => {
    expect(subject.find('[data-qa=learnMore-section]')).to.deep.equal([])
  })
})
