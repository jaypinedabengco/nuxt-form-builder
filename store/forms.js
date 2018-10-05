import FormUtil from '@/utils/FormUtil'
import ObjectUtil from '@/utils/ObjectUtil'

export const MUTATION_TYPES = {
  ADD_TO_LIST: 'ADD_TO_LIST',
  ADD_ALL_TO_LIST: 'ADD_ALL_TO_LIST',
  REMOVE_FROM_LIST: 'REMOVE_FROM_LIST',
  CLEAR_LIST: 'CLEAR_LIST',
  SET_EDITING: 'SET_EDITING',
  CLEAR_EDITING: 'CLEAR_EDITING',
  GET_EDITING: 'GET_EDITING'
}

// hard coded, expected that
// these should be provided via
// api
const HARD_CODED_FORM_FIELD_OPTIONS = [
  {
    label: 'Container',
    type: 'container',
    children: []
  },
  {
    label: 'Container (Horizontal Children)',
    type: 'container',
    options: {
      childrenOrientation: 'horizontal'
    },
    children: []
  },
  {
    label: 'Text',
    type: 'text'
  },
  {
    label: 'Label',
    type: 'label'
  }
]

// states
export const state = () => ({
  list: [],
  editting: null,
  draggableEditGroupName: 'form-builder',
  formFieldOptions: HARD_CODED_FORM_FIELD_OPTIONS
})

// mutations
export const mutations = {
  [MUTATION_TYPES.ADD_TO_LIST](state, form) {
    state.list.push(form)
  },
  [MUTATION_TYPES.ADD_ALL_TO_LIST](state, forms) {
    state.list.push(...forms)
  },
  [MUTATION_TYPES.REMOVE_FROM_LIST](state, form) {
    const index = state.list.indexOf(form)
    if (index) {
      state.list.splice(index, 1)
    } else {
      console.warn(`form ${form} does not exist on list`)
    }
  },
  [MUTATION_TYPES.CLEAR_LIST](state) {
    state.list.splice(0, state.list.length)
  },
  [MUTATION_TYPES.SET_EDITING](state, form) {
    state.editting = form
  },
  [MUTATION_TYPES.CLEAR_EDITING](state) {
    state.editting = null
  },
  [MUTATION_TYPES.GET_EDITING](state) {
    return state.editting
  }
}

// getters
export const getters = {
  formBeingEditted(state) {
    return state.editting
  },
  hasOngoingEdit: state => {
    return !state.editting
  },
  getCloneOfFormFieldOptionByType: state => type => {
    const field = state.formFieldOptions.find(
      fieldOption => fieldOption.type === type
    )
    return field ? ObjectUtil.deepClone(field) : null
  },
  getDraggableEditGroupName: state => state.draggableEditGroupName
}

// actions
export const actions = {
  createForm: async ({ commit, getters }) => {
    // HARD CODED

    let form = getters.getCloneOfFormFieldOptionByType('container')
    form._id = FormUtil.createRandomId()
    form._date_created = new Date().getTime()

    // add to list
    commit(MUTATION_TYPES.SET_EDITING, form)    
    commit(MUTATION_TYPES.ADD_TO_LIST, form)

    return form
  }
}
