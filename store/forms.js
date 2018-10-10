import FormUtil from '@/utils/FormUtil'
import ObjectUtil from '@/utils/ObjectUtil'
import HARD_CODED_FIELD_OPTIONS from '@/sample/json/field-options.json'

export const MUTATION_TYPES = {
  ADD_TO_LIST: 'ADD_TO_LIST',
  ADD_ALL_TO_LIST: 'ADD_ALL_TO_LIST',
  REMOVE_FROM_LIST: 'REMOVE_FROM_LIST',
  CLEAR_LIST: 'CLEAR_LIST',
  UPDATE_FORM_TO_LIST: 'UPDATE_FORM_TO_LIST',
  SET_SELECTED_FORM_ID: 'SET_SELECTED_FORM_ID',
  CLEAR_SELECTED_FORM_ID: 'CLEAR_SELECTED_FORM_ID',
  GET_SELECTED_FORM_ID: 'GET_SELECTED_FORM_ID'
}

// hard coded, expected that
// these should be provided via
// api
const fieldOptions = HARD_CODED_FIELD_OPTIONS

const DEFAULT_STATE = {
  list: [],
  selectedFormId: null,
  formEditDraft: null,
  draggableEditGroupName: 'form-builder',
  formFieldOptions: fieldOptions
}

// states
export const state = () => (DEFAULT_STATE)

// mutations
export const mutations = {
  [MUTATION_TYPES.ADD_TO_LIST](state, form) {
    state.list.push(form)
  },
  [MUTATION_TYPES.ADD_ALL_TO_LIST](state, forms) {
    state.list.push(...forms)
  },
  [MUTATION_TYPES.REMOVE_FROM_LIST](state, form) {
    state.list = [...state.list.filter(innerForm => innerForm._id !== form._id)]
  },
  [MUTATION_TYPES.CLEAR_LIST](state) {
    state.list.splice(0, state.list.length)
  },
  [MUTATION_TYPES.SET_SELECTED_FORM_ID](state, selectedFormId) {
    state.selectedFormId = selectedFormId
  },
  [MUTATION_TYPES.CLEAR_SELECTED_FORM_ID](state) {
    state.selectedFormId = null
  },
  [MUTATION_TYPES.GET_SELECTED_FORM_ID](state) {
    return state.selectedFormId
  },
  [MUTATION_TYPES.UPDATE_FORM](state, form) {
    // delete old form & add new form with updated value
    state.list = [
      ...state.list.filter(innerForm => innerForm._id !== form._id),
      form
    ]
  }
}

// getters
export const getters = {
  formBeingEditted(state, getters) {
    return getters.getFromListById(state.selectedFormId)
  },
  cloneOfFormBeingEditted(state, getters) {
    const { formBeingEditted } = getters
    if (!formBeingEditted) {
      return null
    }
    return ObjectUtil.deepClone(formBeingEditted)
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
  getDraggableEditGroupName: state => state.draggableEditGroupName,
  getFromListById: state => id => {
    const form = state.list.find(form => form._id === id)
    return form
  }
}

// actions
export const actions = {
  createForm: async ({ commit, getters, dispatch }) => {
    let form = getters.getCloneOfFormFieldOptionByType('container')
    form._id = FormUtil.createRandomId()
    form._date_created = new Date().getTime()

    // add to list
    commit(MUTATION_TYPES.ADD_TO_LIST, form)

    // trigger action for selecting form to edit
    await dispatch({ type: 'selectFormToEditById', formId: form._id })

    return form
  },
  selectFormToEditById: async ({ commit, getters }, data) => {
    const { formId } = data
    const form = getters.getFromListById(formId)
    if (!getters.getFromListById(formId)) {
      throw `Form with id of ${formId} not found on list`
    }
    commit(MUTATION_TYPES.SET_SELECTED_FORM_ID, formId)
    return form
  },
  updateForm: async ({ commit }, data) => {
    const { form } = data
    commit(MUTATION_TYPES.UPDATE_FORM_TO_LIST, form)
    return form
  }
}
