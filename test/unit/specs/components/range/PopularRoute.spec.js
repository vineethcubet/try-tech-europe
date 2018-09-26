import {mount} from 'avoriaz'
import Bus from '@/Bus'
import PopularRoute from '@/components/range/PopularRoute'
import Routes from '@/services/Routes'

describe('PopularRoute.vue', () => {
  let subject

  beforeEach(() => {
    sinon.stub(global, 'setInterval').returns(123)
    sinon.stub(Routes, 'getRoutes').returns(['first', 'second'])

    subject = mount(PopularRoute)

    subject.update()
  })

  afterEach(() => {
    setInterval.restore()
    Routes.getRoutes.restore()
  })

  it('shows first route by default', () => {
    expect(subject.hasClass('popularRoute--first')).to.be.true
  })

  it('switches routes after timeout', () => {
    sinon.assert.calledOnce(setInterval)
    sinon.assert.calledWith(setInterval, sinon.match.func, 10000)
  })

  it('shows second round next', () => {
    setInterval.getCall(0).args[0]()
    subject.update()

    expect(subject.hasClass('popularRoute--second')).to.be.true
  })

  it('returns to the first route', () => {
    setInterval.getCall(0).args[0]()
    setInterval.getCall(0).args[0]()
    subject.update()

    expect(subject.hasClass('popularRoute--first')).to.be.true
  })

  it('stops switching routes after the component is removed', () => {
    sinon.stub(global, 'clearInterval')

    subject.destroy()

    sinon.assert.calledOnce(clearInterval)
    sinon.assert.calledWith(clearInterval, 123)

    clearInterval.restore()
  })

  context('seeing the route on the map', () => {
    beforeEach(() => {
      subject = mount(PopularRoute)
    })

    context('seeing Copenhagen to Amsterdam route on the map', () => {
      beforeEach((done) => {
        setInterval.getCall(0).args[0]()
        setInterval.getCall(0).args[0]()
        subject.vm.$nextTick(done)
      })

      it('adds the terminals of the route to the store', () => {
        const listener = sinon.spy()
        Bus.$on('route:trip', listener)

        subject.first('[data-qa=crossNorthSea-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, ['Copenhagen, Denmark', 'Amsterdam, Netherlands'])

        Bus.$off('route:trip', listener)
      })

      it('navigates to the map section', () => {
        const listener = sinon.spy()
        Bus.$on('navigate', listener)

        subject.first('[data-qa=crossNorthSea-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, 'map')

        Bus.$off('navigate', listener)
      })
    })

    context('seeing Zürich to Berlin route on the map', () => {
      it('adds the terminals of the route to the store', () => {
        const listener = sinon.spy()
        Bus.$on('route:trip', listener)

        subject.first('[data-qa=brandenburgGate-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, ['Zürich, Switzerland', 'Berlin, Germany'])

        Bus.$off('route:trip', listener)
      })

      it('navigates to the map section', () => {
        const listener = sinon.spy()
        Bus.$on('navigate', listener)

        subject.first('[data-qa=brandenburgGate-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, 'map')

        Bus.$off('navigate', listener)
      })
    })

    context('seeing Lisbon to Barcelona route on the map', () => {
      beforeEach((done) => {
        setInterval.getCall(0).args[0]()
        subject.vm.$nextTick(done)
      })

      it('adds the terminals of the route to the store', () => {
        const listener = sinon.spy()
        Bus.$on('route:trip', listener)

        subject.first('[data-qa=iberianPeninsula-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, ['Lisbon, Portugal', 'Barcelona, Spain'])

        Bus.$off('route:trip', listener)
      })

      it('navigates to the map section', () => {
        const listener = sinon.spy()
        Bus.$on('navigate', listener)

        subject.first('[data-qa=iberianPeninsula-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, 'map')

        Bus.$off('navigate', listener)
      })
    })

    context('seeing Stockholm to Oslo route on the map', () => {
      beforeEach((done) => {
        setInterval.getCall(0).args[0]()
        setInterval.getCall(0).args[0]()
        subject.vm.$nextTick(done)
      })

      it('adds the terminals of the route to the store', () => {
        const listener = sinon.spy()
        Bus.$on('route:trip', listener)

        subject.first('[data-qa=scandinavianWeekend-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, ['Stockholm, Sweden', 'Oslo, Norway'])

        Bus.$off('route:trip', listener)
      })

      it('navigates to the map section', () => {
        const listener = sinon.spy()
        Bus.$on('navigate', listener)

        subject.first('[data-qa=scandinavianWeekend-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, 'map')

        Bus.$off('navigate', listener)
      })
    })

    context('seeing Budapest to Bucharest route on the map', () => {
      beforeEach((done) => {
        setInterval.getCall(0).args[0]()
        setInterval.getCall(0).args[0]()
        subject.vm.$nextTick(done)
      })

      it('adds the terminals of the route to the store', () => {
        const listener = sinon.spy()
        Bus.$on('route:trip', listener)

        subject.first('[data-qa=budapestToBucharest-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, ['Budapest, Hungary', 'Bucharest, Romania'])

        Bus.$off('route:trip', listener)
      })

      it('navigates to the map section', () => {
        const listener = sinon.spy()
        Bus.$on('navigate', listener)

        subject.first('[data-qa=budapestToBucharest-see-route-button]').trigger('click')

        sinon.assert.calledWith(listener, 'map')

        Bus.$off('navigate', listener)
      })
    })
  })

  context('clicking to the next route', () => {
    beforeEach(() => {
      setInterval.returns(456)

      subject = mount(PopularRoute)

      subject.first('[data-qa=next-route-button]').trigger('click')
    })

    it('displays the second route', () => {
      expect(subject.hasClass('popularRoute--second')).to.be.true
    })

    it('resets the timer', () => {
      sinon.stub(global, 'clearInterval')
      setInterval.resetHistory()

      subject.first('[data-qa=next-route-button]').trigger('click')

      sinon.assert.calledOnce(clearInterval)
      sinon.assert.calledWith(clearInterval, 456)

      sinon.assert.called(setInterval)

      clearInterval.restore()
    })

    it('returns to the first route', () => {
      subject.first('[data-qa=next-route-button]').trigger('click')

      expect(subject.hasClass('popularRoute--first')).to.be.true
    })
  })

  context('clicking to the previous route', () => {
    beforeEach(() => {
      setInterval.returns(456)
      Routes.getRoutes.returns(['first', 'second', 'third'])

      subject = mount(PopularRoute)

      subject.first('[data-qa=previous-route-button]').trigger('click')
    })

    it('displays the third route', () => {
      expect(subject.hasClass('popularRoute--third')).to.be.true
    })

    it('resets the timer', () => {
      sinon.stub(global, 'clearInterval')
      setInterval.resetHistory()

      subject.first('[data-qa=next-route-button]').trigger('click')

      sinon.assert.calledOnce(clearInterval)
      sinon.assert.calledWith(clearInterval, 456)

      sinon.assert.called(setInterval)

      clearInterval.restore()
    })

    it('displays the second route', () => {
      subject.first('[data-qa=previous-route-button]').trigger('click')

      expect(subject.hasClass('popularRoute--second')).to.be.true
    })
  })
})
