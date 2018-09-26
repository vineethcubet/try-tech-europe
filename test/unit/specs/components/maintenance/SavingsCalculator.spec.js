import {mount} from 'avoriaz'
import SavingsCalculator from '@/components/maintenance/SavingsCalculator'

describe('SavingsCalculator.vue', () => {
  context('the user has not completed the questionnaire', () => {
    it('does not show any savings', () => {
      const subject = mount(SavingsCalculator)

      expect(subject.first('[data-qa=total-savings]').text()).to.equal('-----')
    })

    it('does not show annual cost of gas', () => {
      const subject = mount(SavingsCalculator)

      expect(subject.first('[data-qa=annual-cost-of-gas]').text()).to.equal('€0.00')
    })

    it('does not show annual cost of electricity', () => {
      const subject = mount(SavingsCalculator)

      expect(subject.first('[data-qa=annual-cost-of-electricity]').text()).to.equal('€0.00')
    })
  })

  context('the user has partially completed the questionnaire', () => {
    it('the calculator does not compute when the mileage has not been selected', () => {
      const subject = mount(SavingsCalculator)

      subject.vm.$el.querySelector('[data-qa=mpg-field]').selectedIndex = 2
      subject.first('[data-qa=calculate-savings-form]').trigger('submit')

      subject.update()

      expect(subject.first('[data-qa=total-savings]').text()).to.equal('-----')
    })

    it('the calculator does not compute when the mpg has not been selected', () => {
      const subject = mount(SavingsCalculator)

      subject.vm.$el.querySelector('[data-qa=annual-mileage-field]').selectedIndex = 2
      subject.first('[data-qa=calculate-savings-form]').trigger('submit')

      subject.update()

      expect(subject.first('[data-qa=total-savings]').text()).to.equal('-----')
    })
  })

  context('the user has completed the questionnaire', () => {
    let subject

    beforeEach((done) => {
      subject = mount(SavingsCalculator)

      const mpgField = subject.vm.$el.querySelector('[data-qa=mpg-field]')
      mpgField.selectedIndex = 4
      mpgField.dispatchEvent(new Event('change'))
      mpgField.dispatchEvent(new Event('input'))

      const mileageField = subject.vm.$el.querySelector('[data-qa=annual-mileage-field]')
      mileageField.selectedIndex = 3
      mileageField.dispatchEvent(new Event('change'))
      mileageField.dispatchEvent(new Event('input'))

      subject.first('[data-qa=calculate-savings-form]').trigger('submit')

      subject.vm.$nextTick(done)
    })

    it('shows the total savings', () => {
      expect(subject.first('[data-qa=total-savings]').text()).to.equal('€484')
    })

    it('shows the annual cost of gas', () => {
      expect(subject.first('[data-qa=annual-cost-of-gas]').text()).to.equal('€2,340')
    })

    it('shows the annual cost of electricity', () => {
      expect(subject.first('[data-qa=annual-cost-of-electricity]').text()).to.equal('€1,857')
    })

    context('the user changes their selections', () => {
      beforeEach(() => {
        const mpgField = subject.vm.$el.querySelector('[data-qa=mpg-field]')
        mpgField.selectedIndex = 2
        mpgField.dispatchEvent(new Event('change'))
        mpgField.dispatchEvent(new Event('input'))

        const mileageField = subject.vm.$el.querySelector('[data-qa=annual-mileage-field]')
        mileageField.selectedIndex = 3
        mileageField.dispatchEvent(new Event('change'))
        mileageField.dispatchEvent(new Event('input'))

        subject.first('[data-qa=calculate-savings-form]').trigger('submit')
      })

      it('shows the annual cost of gas', () => {
        expect(subject.first('[data-qa=annual-cost-of-gas]').text()).to.equal('€1,560')
      })
    })

    context('the user changes their selections to a non-advantageous scenario', () => {
      beforeEach(() => {
        const mpgField = subject.vm.$el.querySelector('[data-qa=mpg-field]')
        mpgField.selectedIndex = 1
        mpgField.dispatchEvent(new Event('change'))
        mpgField.dispatchEvent(new Event('input'))

        const mileageField = subject.vm.$el.querySelector('[data-qa=annual-mileage-field]')
        mileageField.selectedIndex = 1
        mileageField.dispatchEvent(new Event('change'))
        mileageField.dispatchEvent(new Event('input'))

        subject.first('[data-qa=calculate-savings-form]').trigger('submit')
      })

      it('shows the annual cost of gas', () => {
        expect(subject.first('[data-qa=total-savings]').text()).to.equal('€0.00')
      })
    })
  })
})
