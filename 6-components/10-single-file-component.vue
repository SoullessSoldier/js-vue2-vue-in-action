<template>
    <div class="hello">
        {{msg}}
    </div>
</template>
<script>
export default {
    name: 'hello',
    data(){
        return {
            msg: 'Hello world!'
            }
    }
}
</script>
<style scoped>
    .hello{
        color: red;
    }
</style>