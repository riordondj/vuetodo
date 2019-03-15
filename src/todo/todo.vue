<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么？"
            @keyup.enter="addTodo"
        />
        <Item :todo="todo"
              v-for="todo in filteredTodos"
              :key="todo.id"
              @del="deleteTodo"
              @update="update2"
              @editchange="editchange2"
        ></Item>
        <Tabs :filter="filter"
              :todos="todos"
              @toggle="toggleFilter"
              @clearAll="clearAllCompleted"
        ></Tabs>
    </section>
</template>
<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    import storage from './storage.js'
    export default {
        name:'Todo',
        data(){
            return{
               todos:[],
               filter:'all',
               ids:0,
            }
        },
        components: {
            Item,
            Tabs
        },
        methods:{
            addTodo(e){
                if(e.target.value.trim()!='') {
                    this.todos.unshift({
                        id: this.ids++,
                        content: e.target.value.trim(),
                        completed: false,
                        editable:false,
                        beforecontent:''
                    })
                    e.target.value = ''
                    storage.set('todos', this.todos)
                }else{
                    alert("输入内容不能为空")
                    e.target.value = ''
                }
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1)
                storage.set('todos',this.todos)
            },
            toggleFilter(state){
                this.filter=state
                storage.set('filter',state)
            },
            clearAllCompleted(){
                this.todos=this.todos.filter(todo=>todo.completed===false)
                storage.set("todos",this.todos)
            },
            update2(id){
                storage.set("todos",this.todos)
                storage.set('lastclickid',id)
            },
            editchange2(){
                storage.set('todos',this.todos)
            }
        },
        computed:{
            filteredTodos(){
                if(this.filter ==='all'){
                    return this.todos
                }
                const completed =this.filter ==='completed'
                return this.todos.filter(todo=>completed===todo.completed)
            }

        },
        // watch:{
        //     todos:{
        //         handler(){
        //             storage.set('todos',this.todos)
        //         },
        //         deep:true
        //     }
        // },
        mounted(){
            var todos=storage.get('todos')
            if(todos){
                this.todos=todos
                //解决id冲突
                this.ids=todos[0].id+1
            }
            //解决最后一个点击项的完成状态在页面重新加载时会改变
            var index=this.todos.findIndex(todo=>todo.id===storage.get('lastclickid'))
            if(index>-1) {
                this.todos[index].completed = !this.todos[index].completed
            }
            //存储过滤选项
            if(storage.get('filter')) {
                this.filter = storage.get('filter')
            }else{
                this.filter='all'
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>
