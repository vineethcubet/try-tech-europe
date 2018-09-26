import {mount} from 'avoriaz'
import MaintenanceSavings from '@/components/maintenance/MaintenanceSavings'

describe('MaintenanceSavings.vue', () => {
  it('loads the cost tab by default', () => {
    const subject = mount(MaintenanceSavings)

    const tabs = subject.first('[data-qa=maintenance-savings-tabs]')
    expect(tabs.hasClass('maintenanceSavings--cost')).to.be.true
  })

  it('switches to the parking tab', () => {
    const subject = mount(MaintenanceSavings)

    subject.first('[data-qa=parking-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=maintenance-savings-tabs]')
    expect(tabs.hasClass('maintenanceSavings--parking')).to.be.true
  })

  it('switches to the taxes tab', () => {
    const subject = mount(MaintenanceSavings)

    subject.first('[data-qa=taxes-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=maintenance-savings-tabs]')
    expect(tabs.hasClass('maintenanceSavings--taxes')).to.be.true
  })

  it('switches back to the cost tab', () => {
    const subject = mount(MaintenanceSavings)

    subject.first('[data-qa=taxes-button]').trigger('click')
    subject.update()

    subject.first('[data-qa=cost-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=maintenance-savings-tabs]')
    expect(tabs.hasClass('maintenanceSavings--cost')).to.be.true
  })
})
