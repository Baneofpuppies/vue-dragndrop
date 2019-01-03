<template>
  <div id="app">
    <div class="drop-off" v-drop>
      <div class="box" v-drag>
      </div>
    </div>
    <br>
    <div class="drop-off" v-drop>
      <div class="box" v-drag>
      </div>
    </div> 


    <button class="btn btn-primary" @click="addItem">Add Item</button>
    <br>
    <transition-group name="list" tag="ul" class="list-group">
        <li class="list-group-item" 
        v-for="(number, index) in numbers" 
        @click="removeItem(index)" 
        :key="number"> {{ number }} </li>
    </transition-group>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      numbers: [1,2,3,4,5]
    }
  },
  methods: {
    addItem: function() {
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1)
    },
    removeItem: function(index) {
      this.numbers.splice(index,1)
    }
  }
}
</script>

<style>
.box{
  width: 100px;
  height: 50px;
  background-color: green;
}

.drop-off {
  width: 500px;
  height: 300px;
  border: 2px black solid;
}

</style>
