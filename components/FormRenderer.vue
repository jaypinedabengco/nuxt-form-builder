<template lang="pug">
    container-type(v-if="fieldDefinition.type === 'container'" :field-definition="fieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
         form-renderer(slot="child-container" v-if="fieldDefinition.children" v-for="(childFieldDefinition, index) in fieldDefinition.children"  v-bind:key="index" :field-definition="childFieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
    text-type(v-else-if="fieldDefinition.type === 'text'" :field-definition="fieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
    label-type(v-else-if="fieldDefinition.type === 'label'" :field-definition="fieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
    div(v-else) Unknown field definition of type {{fieldDefinition.type}}
</template>
<script>
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'
import FieldRendererContainerType from '@/components/FieldRendererContainerType'
import FieldRendererTextType from '@/components/FieldRendererTextType'
import FieldRendererLabelType from '@/components/FieldRendererLabelType'

export default {
    name: 'FormRenderer',
    components: {
        'container-type': FieldRendererContainerType,
        'text-type': FieldRendererTextType, 
        'label-type': FieldRendererLabelType
    },
    mixins: [FieldDefinitionMixins],
    created () {
        console.log('Form Renderer')
        console.log('editMode', this.editMode)
        console.log('editModeDraggableGroupName', this.editModeDraggableGroupName)
    }
}
</script>
