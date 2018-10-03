<template lang="pug">
    section.container-type(:class="{empty: hasEmptyChild}") 
        draggable(v-model="fieldDefinition.children" :options="{group:'form-builder'}")
            slot(name="child-container")
        //- draggable(v-if="editMode" v-model="fieldDefinition.children" :options="{group:editModeDraggableGroupName}")
        //-     slot(name="child-container")
        //- section(v-else)
        //-     slot(name="child-container")
</template>
<script>
import draggable from 'vuedraggable'
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'

export default {
    components: {
        draggable: draggable
    },
    mixins: [FieldDefinitionMixins],
    computed: {
        hasEmptyChild () {
            const { children } = this.fieldDefinition
            return (!(children instanceof Array) || children.length === 0)
        },
        children () {
            return this.fieldDefinition.children
        }
    },
    created () {
        console.log(this.fieldDefinition)
        // if has no children, then add it
        if ( this.fieldDefinition ) {
            this.$set(this.fieldDefinition, 'children', [])
        }
        console.log('Container')
        console.log('editMode', this.editMode)
        console.log('editModeDraggableGroupName', this.editModeDraggableGroupName)
    }
}
</script>

<style scoped>
.container-type > * {
    min-height: 30px
}
section {
  border: 1px solid;
}
.empty {
  width: 100%;
}
</style>

