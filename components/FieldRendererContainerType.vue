<template lang="pug">
    section.container-type(:class="{empty: noChildren, 'edit-mode': editMode}")
        draggable.draggable-content( 
                v-if="editMode" 
                v-model="fieldDefinition.children" 
                :options="{group:editModeDraggableGroupName}" 
                :class="orientationParentClass" 
                @filter="onElementDraggedTo")
            slot(name="child-container" :class="orientationChildClass")
        section.container-content(v-else :class="orientationParentClass")
            slot(name="child-container" :class="orientationChildClass")
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
        noChildren () {
            const { children } = this.fieldDefinition
            return (!(children instanceof Array) || children.length === 0)
        },
        children () {
            return this.fieldDefinition.children
        },
        isChildrenHorizontal () {
            const { options } = this.fieldDefinition
            return (options && options.childrenOrientation === 'horizontal')
        },
        orientationParentClass () {
            const { options } = this.fieldDefinition
            const isHorizontalView = (options && options.childrenOrientation === 'horizontal')
            return {
                'columns': isHorizontalView
            }
        },
        orientationChildClass () {
            const { options } = this.fieldDefinition
            const isHorizontalView = (options && options.childrenOrientation === 'horizontal')
            return {
                'columns': isHorizontalView
            }
        }
    },
    created () {
        // if has no children, then add it
        if (!this.fieldDefinition.children) {
            this.$set(this.fieldDefinition, 'children', [])
        }
    },
    methods: {
        onElementDraggedTo () {
            console.log('hey!, drag drag drag drag!')
        }
    }
}
</script>

<style scoped>
.container-type .draggable-content {
  min-height: 30px;
  min-width: 30px;
}

section.edit-mode {
  border: 1px solid;
  padding: 5px;
  margin: 5px;
}
section.edit-mode.empty {
  border-style: dashed;
}
section.edit-mode:hover {
  border-width: 2px;
  border-color: red;
}
</style>

