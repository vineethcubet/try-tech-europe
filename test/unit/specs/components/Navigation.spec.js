import {mount} from 'avoriaz'
import Navigation from '@/components/Navigation'

describe('Navigation.js', () => {
  context('toggling the mobile menu', () => {
    it('opens the menu if it is already closed', () => {
      const subject = mount(Navigation)

      const mobileMenuToggler = subject.first('[data-qa=mobile-menu-toggler]')
      mobileMenuToggler.trigger('click')

      expect(subject.first('[data-qa=navigation-menu]').hasClass('journey__navigation--toggled')).to.be.true
    })

    it('closes the menu if it is already open', () => {
      const subject = mount(Navigation)

      const mobileMenuToggler = subject.first('[data-qa=mobile-menu-toggler]')
      mobileMenuToggler.trigger('click')
      mobileMenuToggler.trigger('click')

      expect(subject.first('[data-qa=navigation-menu]').hasClass('journey__navigation--toggled')).to.be.false
    })
  })
})
