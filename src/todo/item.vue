<template>
    <div :class="['todo-item',todo.completed ? 'completed':'']">
        <input
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
            @click="change"
        />
        <label @click="isedit">{{this.todo.content}}
            <input class="edit"
                   v-show="todo.editable"
                   @blur="finishedit"
                   @keyup.enter="finishedit"
            />
        </label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>
<script>
    export default {
        name:'Item',
        props: {
            todo: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
            }
        },
        methods:{
            deleteTodo(){
                this.$emit('del',this.todo.id)
            },
            change(){
                this.$emit('update',this.todo.id)
            },
            isedit(){
                this.todo.editable=true
                this.$set(this.todo,'beforecontent',this.todo.content)
            },
            finishedit(e){
                if(e.target.value.trim()!='') {
                    this.todo.editable = false
                    this.$set(this.todo,'content',e.target.value)
                    this.$emit('editchange')
                }else{
                    this.todo.editable = false
                    this.$set(this.todo,'content',this.todo.beforecontent)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .destory:after{
                content: '×'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
            input{
                position:absolute
                padding: 10px 50px 10px 15px;
                font-size :inherit
                top:0
                bottom:0
                width:70%
            }
        }

        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        &:after{
            content url('../assets/images/round.svg')
        }
        &:checked:after{
            content url('../assets/images/done.svg')
        }
    }
    .destory{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>
