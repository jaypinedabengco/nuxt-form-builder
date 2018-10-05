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
import { mapGetters } from 'vuex'

export default {
    name: 'FormRendererEditMode',
    components: {
        'form-renderer': FormRenderer,
        'json-structure-viewer': JsonStructureViewer
    },
    mixins: [FieldDefinitionMixins],
    props: {
        showJsonPreview: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    computed: {
        ...mapGetters('forms/', {
            groupName: 'getDraggableEditGroupName'
        }), 
    },
}
</script>
