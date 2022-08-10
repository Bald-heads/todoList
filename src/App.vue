<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <my-header/>
                <MyList :todos="todos"/>
                <my-footer :todos="todos"/>
            </div>
        </div>
    </div>
</template>

<script>
import pubSub from "pubsub-js";
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import MyList from "@/components/MyList";

export default {

    name: 'App',
    mounted() {
        this.pubId = pubSub.subscribe("receive", this.receive)
        this.$bus.$on("checkTodo", this.checkTodo)
        this.$bus.$on("deleteTodo", this.deleteTodo)
        this.$bus.$on("checkAllTodo", this.checkAllTodo)
        this.$bus.$on("clearAllTodo", this.clearAllTodo)
        this.$bus.$on("editTodo", this.editTodo)
    },
    beforeDestroy() {
        this.$bus.$off(["checkTodo", "deleteTodo", "checkAllTodo"])
        pubSub.unsubscribe(this.pubId)
    },
    components: {
        MyHeader,
        MyFooter,
        MyList,
    },
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    methods: {
        receive(_, todoObj) {
            this.todos.unshift(todoObj)
        },
        checkTodo(nid) {
            this.todos.forEach((todo) => {
                if (todo.id === nid) todo.done = !todo.done
            })
        },
        deleteTodo(nid) {
            this.todos = this.todos.filter((todo) => {
                return todo.id !== nid
            })
        },
        checkAllTodo(done) {
            this.todos.forEach((todo) => {
                todo.done = done
            })
        },
        clearAllTodo() {
            this.todos = this.todos.filter((todo) => {
                return !todo.done
            })
        },
        editTodo(nid, newValue) {
            this.todos.forEach(value => {
                if (value.id === nid) {
                    value.title = newValue
                }
            })
        }
    },
    watch: {
        todos: {
            deep: true,
            handler(value) {
                localStorage.setItem('todos', JSON.stringify(value))
            }
        }
    },
}
</script>

<style>
body {
    background-color: #fff;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
}

.btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
}

.btn-demo {
    color: #fff;
    background-color: skyblue;
    border: 1px solid white;
    margin-right: 5px;
}

.btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
}

.btn-demo:hover {
    color: #fff;
    background-color: deepskyblue;
}

.btn:focus {
    outline: none;
}

.todo-container {
    width: 600px;
    margin: 0 auto;
}

.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
