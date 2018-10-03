<template lang="pug">
    section
        div
            form-renderer(:fieldDefinition="fieldDefinition" :editMode="true" :editModeDraggableGroupName="groupName")
        div(v-if="showJsonPreview")
             json-structure-viewer(:json-object="fieldDefinition")

</template>
<script>
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'
import FormRenderer from '@/components/FormRenderer'
import JsonStructureViewer from '@/components/JsonStructureViewer'

export default {
    name: 'FormRendererEditMode',
    components: {
        'form-renderer': FormRenderer,
        'json-structure-viewer': JsonStructureViewer
    },
    mixins: [FieldDefinitionMixins],
    props: {
        groupName: {
            type: String,
            required: true
        },
        showJsonPreview: {
            type: Boolean,
            default () {
                return false
            }
        }
    }
}
</script>
