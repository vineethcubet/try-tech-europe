import {mount} from 'avoriaz'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

describe('FeatureNotAvailable.vue', () => {
  it('should not show form by default', () => {
    const subject = mount(FeatureNotAvailable, {
      propsData: {
        text: 'Click Me!'
      }
    })

    expect(subject.find('[data-qa=capture-email-form]')[0]).to.not.exist
  })

  it('should show form when email summary button is clicked', () => {
    const subject = mount(FeatureNotAvailable, {
      propsData: {
        text: 'Click Me!'
      }
    })

    subject.first('[data-qa=build-vehicle-button]').trigger('click')

    expect(subject.find('[data-qa=capture-email-form]')[0]).to.exist
  })

  context('form is open', () => {
    let subject

    beforeEach(() => {
      subject = mount(FeatureNotAvailable, {
        propsData: {
          text: 'Click Me!'
        }
      })

      subject.first('button').trigger('click')
    })

    it('the form disappears after it is submitted', () => {
      subject.first('[data-qa=capture-email-form]').trigger('submit')

      expect(subject.find('[data-qa=capture-email-form]')[0]).to.not.exist
    })

    context('the modal is reopened', () => {
      beforeEach((done) => {
        const emailAddressInput = subject.vm.$el.querySelector('[data-qa=email-address-input]')
        emailAddressInput.value = 'hello@world.com'
        emailAddressInput.dispatchEvent(new Event('input'))

        subject.first('[data-qa=capture-email-form]').trigger('submit')
        subject.first('button').trigger('click')

        subject.vm.$nextTick(done)
      })

      it('the input field is blank', () => {
        expect(subject.vm.$el.querySelector('[data-qa=email-address-input]').value).to.equal('')
      })
    })
  })
})
