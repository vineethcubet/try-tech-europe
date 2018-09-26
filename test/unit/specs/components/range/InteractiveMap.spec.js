import {shallow} from 'avoriaz'
import Vuex from 'vuex'
import {structure} from '@/store'
import InteractiveMap from '@/components/range/InteractiveMap'
import RouteWizard from '@/components/range/drive/RouteWizard'
import DriveVisualizer from '@/components/range/drive/DriveVisualizer'

describe('InteractiveMap.js', () => {
  let localStore
  let subject

  beforeEach(() => {
    structure.mutations.setRoute = (state, route) => {
      state.route = route
    }

    localStore = new Vuex.Store(structure)

    subject = shallow(InteractiveMap, {
      store: localStore
    })
  })

  it('it has a route wizard', () => {
    expect(subject.contains(RouteWizard)).to.be.true
  })

  it('it has a drive visualizer', () => {
    expect(subject.contains(DriveVisualizer)).to.be.true
  })
})
