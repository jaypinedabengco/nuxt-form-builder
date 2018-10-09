<template lang="pug">
    section.container-type(:class="{empty: noChildren, 'edit-mode': editMode, 'horizontal-view': isChildrenHorizontal}")
        draggable.draggable-content(
                v-if="editMode" 
                v-model="fieldDefinition.children" 
                :options="draggableOption" 
                :class="orientationParentClass")
            slot(name="child-container" :class="orientationChildClass")
        section.container-content(v-else :class="orientationParentClass")
            slot(name="child-container" :class="orientationChildClass")
</template>
<script>
import draggable from 'vuedraggable'
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'
import { mapGetters } from 'vuex'

export default {
    components: {
        draggable: draggable
    },
    mixins: [FieldDefinitionMixins],
    computed: {
        ...mapGetters('forms/', {
            draggableGroupName: 'getDraggableEditGroupName'
        }),
        draggableOption () {
            const options = {
                group: this.draggableGroupName
            }
            return options
        },
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
                'column': isHorizontalView
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
  min-height: 50px;
  min-width: 50px;
}

.container-type.edit-mode {
  border: 1px solid green;
  padding: 5px;
  margin: 5px;
}

.container-type.edit-mode.empty {
  border-style: dashed;
}

.container-type.edit-mode:hover {
  border-width: 2px;
}

.container-type.edit-mode.horizontal-view {
  border-color: blue;
}
</style>

