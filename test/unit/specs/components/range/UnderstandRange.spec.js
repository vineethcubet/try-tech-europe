import {mount} from 'avoriaz'
import UnderstandRange from '@/components/range/UnderstandRange'

describe('UnderstandRange.vue', () => {
  it('loads the high speed tab by default', () => {
    const subject = mount(UnderstandRange)

    const tabs = subject.first('[data-qa=range-influencer-tabs]')
    expect(tabs.hasClass('understandingRange__descriptions--highSpeed')).to.be.true
  })

  it('switches to the extreme weather tab', () => {
    const subject = mount(UnderstandRange)

    subject.first('[data-qa=extremeWeather-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=range-influencer-tabs]')
    expect(tabs.hasClass('understandingRange__descriptions--extremeWeather')).to.be.true
  })

  it('switches to the interior climate tab', () => {
    const subject = mount(UnderstandRange)

    subject.first('[data-qa=interiorClimate-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=range-influencer-tabs]')
    expect(tabs.hasClass('understandingRange__descriptions--interiorClimate')).to.be.true
  })

  it('switches back to the high speed tab', () => {
    const subject = mount(UnderstandRange)

    subject.first('[data-qa=interiorClimate-button]').trigger('click')
    subject.update()

    subject.first('[data-qa=highSpeed-button]').trigger('click')
    subject.update()

    const tabs = subject.first('[data-qa=range-influencer-tabs]')
    expect(tabs.hasClass('understandingRange__descriptions--highSpeed')).to.be.true
  })
})
