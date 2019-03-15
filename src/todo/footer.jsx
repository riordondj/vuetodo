import '../assets/styles/footer.styl'
export default {
    name:'Footer',
    data(){
        return {
            author:'Riordon'
        }
    },
    render(){
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}
