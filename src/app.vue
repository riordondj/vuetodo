<template>
    <div id="app">
        <div id="cover">
            <Header></Header>
            <Todo></Todo>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
    import Footer from './todo/footer.jsx'
    import Todo from './todo/todo.vue'
    import Header from './todo/header.vue'
    export default {
        components:{
            Header,
            Footer,
            Todo
        }
    }
</script>

<style lang="stylus" scoped>
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9

    }
</style>
