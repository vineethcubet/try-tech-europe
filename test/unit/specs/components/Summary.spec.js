import {shallow} from 'avoriaz'
import Summary from '@/components/Summary'
import DriveSummary from '@/components/range/drive/DriveSummary'
import ChargingSummary from '@/components/charging/ChargingSummary'

describe('Summary.vue', () => {
  it('includes a route summary', () => {
    const subject = shallow(Summary)

    expect(subject.find(DriveSummary)[0]).to.exist
  })

  it('includes a charging summary', () => {
    const subject = shallow(Summary)

    expect(subject.find(ChargingSummary)[0]).to.exist
  })
})
