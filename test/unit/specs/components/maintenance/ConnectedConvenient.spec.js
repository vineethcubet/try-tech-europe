import {mount} from 'avoriaz'
import ConnectedConvenient from '@/components/maintenance/ConnectedConvenient'

describe('ConnectedConvenient.vue', () => {
  it('should load the OTA Updates tab by default', () => {
    const subject = mount(ConnectedConvenient)

    const tabs = subject.first('[data-qa=connectedConvenient-tabs]')
    expect(tabs.hasClass('connectedConvenient__descriptions--otaUpdates')).to.be.true
  })

  it('should switch to the remoteDiagnostics tab when that tab is clicked', () => {
    const subject = mount(ConnectedConvenient)

    subject.first('[data-qa=remoteDiagnostics-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=connectedConvenient-tabs]')
    expect(tabs.hasClass('connectedConvenient__descriptions--remoteDiagnostics')).to.be.true
  })

  it('should switch to the maintenanceAlerts tab when that tab is clicked', () => {
    const subject = mount(ConnectedConvenient)

    subject.first('[data-qa=maintenanceAlerts-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=connectedConvenient-tabs]')
    expect(tabs.hasClass('connectedConvenient__descriptions--maintenanceAlerts')).to.be.true
  })

  it('should switch to the roadsideAssistance tab when that tab is clicked', () => {
    const subject = mount(ConnectedConvenient)

    subject.first('[data-qa=roadsideAssistance-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=connectedConvenient-tabs]')
    expect(tabs.hasClass('connectedConvenient__descriptions--roadsideAssistance')).to.be.true
  })

  it('should switch back to the over the air tab', () => {
    const subject = mount(ConnectedConvenient)

    subject.first('[data-qa=roadsideAssistance-button]').trigger('click')
    subject.update()

    subject.first('[data-qa=otaUpdates-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=connectedConvenient-tabs]')
    expect(tabs.hasClass('connectedConvenient__descriptions--otaUpdates')).to.be.true
  })
})
