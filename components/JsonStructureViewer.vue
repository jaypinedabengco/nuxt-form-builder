<template lang="pug">
    div
        pre {{jsonObjectInString | pretty}}
</template>

<script>
export default {
    filters: {
        pretty (value) {
            return JSON.stringify(JSON.parse(value), null, 2)
        }
    },
    props: {
        jsonObject: {
            type: [Object, Array],
            required: true
        }
    },
    computed: {
        jsonObjectInString () {
            return JSON.stringify(this.jsonObject)
        }
    },
    created () {
        console.log(JSON.stringify(this.jsonObject))
    }
}
</script>

<style scoped>
</style>