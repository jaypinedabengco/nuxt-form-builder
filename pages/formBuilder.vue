<template lang="pug">
    div
        section.section
            div.container
                div.columns
                    div.column.form-options-container
                        draggable(v-model="formList" :move="onMove" :options="formListContainerOptions")
                            div(v-for="(form, index) in formList" :key="index") {{form.label}}
                    div.column.is-three-quarters.built-form-container
                        form-renderer(:fieldDefinition="structuredForm" :editMode="true" :editModeDraggableGroupName="formListContainerOptions.group.name")
        section.section            
            div.container
                h1 Contents
                div
                    h1 JSON Structure for built
                    div
                        pre {{structuredFormInJSON | pretty}}
                        
</template>

<script>
import draggable from 'vuedraggable'
import FormRenderer from '@/components/FormRenderer'
export default {
    components: {
        draggable: draggable,
        'form-renderer': FormRenderer
    },
    filters: {
        pretty (value) {
            return JSON.stringify(JSON.parse(value), null, 2)
        }
    },
    data () {
        return {
            formListContainerOptions: {
                group: {
                    name: 'form-builder',
                    pull: 'clone',
                    put: false
                },
                sort: false
            },
            formBuiltContainerOptions: {
                group: 'form-builder'
            },
            formList: [{
                label: 'Container',
                type: 'container',
                children: []                
            }, {
                label: 'Text',
                type: 'text'
            }],
            structuredForm: {
                label: 'Container',
                type: 'container',
                children: []
            }
        }
    },
    computed: {
        structuredFormInJSON () {
            return JSON.stringify(this.structuredForm)
        }
    },
    methods: {
        onMove () {
            console.log('this.formList', this.formList)
            console.log('this.structuredForm', this.structuredForm)
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
