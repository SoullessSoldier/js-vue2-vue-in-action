
<script>
export default {
  name: 'HelloWorld',
  render(h){
    return(
      <div>
        <div class="text-center"
        on-click={this.pressed}
        domPropsInnerHTML={this.msg}>
        </div>
      </div>
    )
  },
  data () {
    return {
      welcome: 'Hello, world',
      msg: `<h${this.header}>Hello World ${this.name}</h${this.header}>`
    }
  },
  methods: {
    pressed(){
      alert('Clicked');
    }
  },
  props: ['header', 'name']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
