<template lang="pug">
    container-type(v-if="fieldDefinition.type === 'container'" :field-definition="fieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
         form-renderer(slot="child-container" v-if="fieldDefinition.children" v-for="(childFieldDefinition, index) in fieldDefinition.children"  v-bind:key="index" :field-definition="childFieldDefinition")
    text-type(v-else-if="fieldDefinition.type === 'text'" :field-definition="fieldDefinition" :edit-mode="editMode" :edit-mode-draggable-group-name="editModeDraggableGroupName")
    div(v-else) Unknown field definition of type {{fieldDefinition.type}}
</template>
<script>
import FieldRendererContainerType from '@/components/FieldRendererContainerType'
import FieldRendererTextType from '@/components/FieldRendererTextType'
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'

export default {
    name: 'FormRenderer',
    components: {
        'container-type': FieldRendererContainerType,
        'text-type': FieldRendererTextType
    },
    mixins: [FieldDefinitionMixins],
    created () {
        console.log('Form Renderer')
        console.log('editMode', this.editMode)
        console.log('editModeDraggableGroupName', this.editModeDraggableGroupName)
    }
}
</script>
