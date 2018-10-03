<template lang="pug">
    div
        section.section
            div.container
                div.columns
                    div.column.form-options-container
                        form-toolbox-container(:group-name="groupName")
                    div.column.is-three-quarters.built-form-container
                        form-renderer-edit-mode(:field-definition="structuredForm" :group-name="groupName" :show-json-preview="true")
        section.section            
            div.container
                h1 Contents
</template>

<script>
import draggable from 'vuedraggable'
import FormToolBoxContainer from '@/components/FormToolBoxContainer'
import FormRendererEditMode from '@/components/FormRendererEditMode'

export default {
    components: {
        draggable: draggable,
        'form-toolbox-container': FormToolBoxContainer,
        'form-renderer-edit-mode': FormRendererEditMode
    },
    data () {
        return {
            groupName: 'form-builder',
            structuredForm: {
                label: 'Container',
                type: 'container',
                children: []
            }
        }
    }
}
</script>

<style scoped>
.form-options-container {
  background-color: green;
  color: white;
}
</style>
