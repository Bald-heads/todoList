<template>
    <div>
        <ul class="todo-main">
            <MyItem v-for="todoObj in todos" :key="todoObj.id" :todoObj="todoObj"/>
        </ul>
    </div>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
    name: 'MyList',
    components: {
        MyItem,
    },
    props: ["todos"]
}
</script>

<style scoped>
.todo-main {
    margin-left: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>