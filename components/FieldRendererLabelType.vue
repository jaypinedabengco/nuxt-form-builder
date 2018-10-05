<template lang="pug">
    section
        | Label
        //- input(v-if="editMode")
        //- label(v-else)
        //- | Text Type
</template>
<script>
import FieldDefinitionMixins from '@/mixins/FieldDefinitionMixins'

export default {
    mixins: [FieldDefinitionMixins],
    created () {
    }
}
</script>

<style scoped>
</style>

