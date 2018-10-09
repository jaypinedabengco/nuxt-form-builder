<template lang="pug">
    div
        draggable(v-model="formList" :clone="onClone" :options="draggableOptions")
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
import FormUtil from '@/utils/FormUtil'
import { mapState, mapGetters } from 'vuex'

export default {
    components: {
        draggable: draggable,
        JsonStructureViewer
    },
    computed: {
        ...mapState('forms/', {
            formList: state => state.formFieldOptions,
        }),
        ...mapGetters('forms/', {
            draggableGroupName: 'getDraggableEditGroupName'
        }),
        draggableOptions () {
            const options = {
                group: {
                    name: this.draggableGroupName,
                    pull: 'clone',
                    put: false
                },
                sort: false
            }
            return options
        }
    },
    methods: {
        onClone (field) {
            let clonedField = JSON.parse(JSON.stringify(field))
            clonedField._field_id = FormUtil.createRandomId()
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
