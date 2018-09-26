import {mount} from 'avoriaz'
import {compileToFunctions} from 'vue-template-compiler'
import AutocompleteAddress from '@/components/input/AutocompleteAddress'
import AddressSuggester from '@/services/maps/AddressSuggester'

describe('AutocompleteAddress.vue', () => {
  let subject

  beforeEach(() => {
    sinon.stub(AddressSuggester, 'AddressSuggester')

    subject = mount(AutocompleteAddress, {
      slots: {
        default: compileToFunctions('<input data-qa="input" />')
      }
    })
  })

  afterEach(() => {
    AddressSuggester.AddressSuggester.restore()
  })

  it('register address suggester for input', () => {
    const inputToRegister = subject.vm.$el.querySelector('[data-qa=input]')

    sinon.assert.calledOnce(AddressSuggester.AddressSuggester)
    sinon.assert.calledWith(AddressSuggester.AddressSuggester, inputToRegister, sinon.match.func)
  })

  it('should trigger suggestion received event ', () => {
    const eventListener = sinon.spy()
    subject.vm.$on('suggestion', eventListener)

    const suggestionReceivedCallback = AddressSuggester.AddressSuggester.getCall(0).args[1]
    suggestionReceivedCallback('any address')

    sinon.assert.calledOnce(eventListener)
    sinon.assert.calledWith(eventListener, 'any address')
  })

  it('should trigger input event on form field', () => {
    const listener = sinon.spy()
    subject.vm.$el.querySelector('[data-qa=input]').addEventListener('input', listener)

    const suggestionReceivedCallback = AddressSuggester.AddressSuggester.getCall(0).args[1]
    suggestionReceivedCallback('any address')

    sinon.assert.calledOnce(listener)
  })
})
