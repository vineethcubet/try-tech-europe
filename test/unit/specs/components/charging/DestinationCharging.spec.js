import {shallow} from 'avoriaz'
import DestinationCharging from '@/components/charging/destination/DestinationCharging'

describe('DestinationCharging.js', () => {
  let subject

  beforeEach(() => {
    subject = shallow(DestinationCharging)
  })

  it('should not show learn more section by default', () => {
    expect(subject.find('[data-qa=destinationCharging__learnMore]')).to.deep.equal([])
  })
})
