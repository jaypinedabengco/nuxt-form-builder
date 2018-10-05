<template lang="pug">
    div
        section.section
            div.container
                div.columns
                    div.column.form-options-container
                        form-toolbox-container
                    div.column.is-three-quarters.built-form-container
                        form-renderer-edit-mode(v-if="formDefinitionForEdit" :field-definition="formDefinitionForEdit" :show-json-preview="true")
                        div(v-else)
                            div No Ongoing edit
                            div
                                button.button(@click="createNewForm") create
        section.section            
            div.container
                h1 Contents

</template>

<script>
import draggable from 'vuedraggable'
import FormToolBoxContainer from '@/components/FormToolBoxContainer'
import FormRendererEditMode from '@/components/FormRendererEditMode'
import { mapActions,  mapState } from 'vuex'

export default {
    components: {
        draggable: draggable,
        'form-toolbox-container': FormToolBoxContainer,
        'form-renderer-edit-mode': FormRendererEditMode
    },
    computed: {
        ...mapState('forms/', {
            formBeingEditted: (state) => {
                return {
                    get() {
                        
                    }
                }
            }
        })
    },
    methods: {
        ...mapActions('forms/', {
            createNewForm: 'createForm'
        })
    }
}
</script>

<style scoped>
.form-options-container {
  background-color: green;
  color: white;
}
</style>
