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
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        'draggable': draggable,
        'form-toolbox-container': FormToolBoxContainer,
        'form-renderer-edit-mode': FormRendererEditMode
    },
    data () {
        return {
            // NOTE: ADD draft or ongoing form, used for temporary caching....
            formDefinitionForEdit: null
        }
    },
    computed: {
        ...mapGetters('forms/', ['cloneOfFormBeingEditted'])
    },
    watch: {
        cloneOfFormBeingEditted (value) {
            this.formDefinitionForEdit = value
        },
        formDefinitionForEdit: {
            handler (value) {
                console.log('change on child level', value)
            }, deep: true
        }
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
