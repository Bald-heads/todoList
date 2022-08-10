<template>
    <div class="todo-footer" v-show="total">
        <label>
            <input type="checkbox" :checked="isAll" @click="checkAll">
        </label>
        <span>
            <span>已完成{{ doneTotal }}</span>  /全部{{ total }}
        </span>
        <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>

export default {

    name: 'MyFooter',
    components: {},
    props: ['todos', 'clearAllTodo'],
    computed: {
        doneTotal() {
            return this.todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
        },
        total() {
            return this.todos.length
        },
        isAll() {
            return this.doneTotal === this.total && this.total > 0
        }
    },
    methods: {
        checkAll(event) {
            this.$bus.$emit("checkAllTodo", event.target.checked)
        },
        clearAll() {
            this.$bus.$emit("clearAllTodo")
        }
    }
}
</script>

<style scoped>

.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    cursor: pointer;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    height: 26px;
    margin-top: 5px;
}
</style>