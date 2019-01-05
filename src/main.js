import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// This directive allows an element to be dragged around
Vue.directive('drag', {
  bind(el,binding, vnode) {
    el.addEventListener("mousedown",eventHandler)
    function eventHandler(event) {
      if(event.type == "mousedown"){
        // use the following context to emit an event on the vue instance. This is so that the "drop" directive will know what to do 
        vnode.context.$emit('dragMouseDown')
        el.style.border="3px black solid" 
        document.addEventListener("mousemove",eventHandler)
        document.addEventListener("mouseup",eventHandler)
      }else if(event.type == "mousemove" ) {
                // Get the properties of the current element when the mouse moves
                var rect = el.getBoundingClientRect()
                // set the position of the element to fixed so it pops out of the DOM - fixed makes sure that the position is in relation to the window
                // so that scrolling will not affect it
                el.style.position = "fixed"
                // set the left and top properties dynamically so that the element follows the mousepointer around the page
                el.style.left = parseInt(rect.left,10) + (event.clientX - parseInt(rect.left,10) - parseInt(rect.width,10)/2.)+ "px"
                el.style.top = parseInt(rect.top,10) + (event.clientY - parseInt(rect.top,10) - parseInt(rect.height,10)/2.)+ "px"
      }else if(event.type == "mouseup"){
        vnode.context.$emit('dragMouseUp', el)
        // Remove the mousemove listener from the document object so that the element stops following the mouse
        document.removeEventListener("mousemove", eventHandler)
        document.removeEventListener("mouseup", eventHandler)
        
        el.style.border=""
        el.style.position= "absolute"
        //el.style.left="initial"
        //el.style.top="initial"
      }
    }
  }
})

// This directive allows draggable elements to be dropped into the indicated droppable element
Vue.directive('drop', {
  bind(el,binding, vnode) {
    vnode.context.$on('dragMouseDown', () => {
      // el.style.backgroundColor = "#dddddd"
      el.style.border = "3px blue solid"
    })
    vnode.context.$on('dragMouseUp', (otherEl) => {
      // When the dragMouseUp event happens, we want to make this element a parent of the passed 'otherEl' element
      // First we need to check if the other element is overlapping the current droppable element
      var otherElRect = otherEl.getBoundingClientRect()
      var thisElRect = el.getBoundingClientRect()
      if(thisElRect.x <= otherElRect.x && otherElRect.x <= thisElRect.x + thisElRect.width){
        console.log("the droppable element left x: " + thisElRect.x)
        console.log("the droppable element right:" + (thisElRect.x+thisElRect.width))
        if(thisElRect.y <= otherElRect.y && otherElRect.y <= thisElRect.y + thisElRect.height){
          console.log("the y checks out")
        //var newNode = otherEl.cloneNode()
        el.appendChild(otherEl)
        console.log("Appended")
        // otherEl.remove()

        }
      }
      el.style.backgroundColor = ""
      el.style.border = ""
      // otherEl.style.backgroundColor="blue"
    })
    
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
