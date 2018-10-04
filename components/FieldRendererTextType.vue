<template lang="pug">
    section
        | Text Type
</template>
<script>
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'

export default {
    mixins: [FieldDefinitionMixins],
    created () {
        console.log('Container')
        console.log('editMode', this.editMode)
        console.log('editModeDraggableGroupName', this.editModeDraggableGroupName)
    }
}
</script>

<style scoped>
.empty {
  height: 50px;
  width: 100%;
}
</style>

