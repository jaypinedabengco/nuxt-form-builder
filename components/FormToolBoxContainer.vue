<template lang="pug">
    div
        draggable(v-model="formList" :clone="onClone" :options="formListContainerOptions")
            div.tool(v-for="(form, index) in formList" :key="index")
                b-icon(icon="account" size="is-small") 
                | {{form.label}}
        div.json-view
            | JSON Structure
            json-structure-viewer(:json-object="formList")
</template>

<script>
import draggable from 'vuedraggable'
import JsonStructureViewer from '@/components/JsonStructureViewer'

export default {
    components: {
        draggable: draggable,
        JsonStructureViewer
    },
    props: {
        groupName: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            formListContainerOptions: {
                group: {
                    name: this.groupName,
                    pull: 'clone',
                    put: false
                },
                sort: false
            },
            formList: [{
                label: 'Container',
                type: 'container',
                children: []
            }, {
                label: 'Text',
                type: 'text'
            }]
        }
    },
    methods: {
        onClone (field) {
            console.log('field', field)
            let clonedField = JSON.parse(JSON.stringify(field))
            return clonedField
        }
    }
}
</script>

<style scoped>
.json-view {
  padding: 10px;
  background-color: grey;
}
.tool {
  margin: 5px;
  border: 1px solid;
  cursor: move;
}
</style>
