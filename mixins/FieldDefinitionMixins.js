export default {
  props: {
    fieldDefinition: {
      type: Object,
      required: true,
      validation(value) {
        // type is required
        return !value.type
      }
    },
    editMode: {
      type: Boolean,
      default() {
        return false
      }
    },
    editModeDraggableGroupName: {
      type: String,
      default() {
        // if edit mode, then
        // should pass value to 'editModeDraggableGroupName'
        return ''
      }
    }
  }
}
