/*Vue Project*/

//import vue createApp.
import {createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
//Initialise Vue app.
const Card = {
  template:`<div class="card">
        <div class="card-img-container">
          <img :src="cardImg" alt="Card Image" class="card-img"/>
        </div>
        <p class="card-text">{{cardText}}
</p>
      </div>`,
      props:{
        cardImg:{
          type:String,
          required:true
        },
        cardText:{
          type:String,
          required:true
        }
      }
}
const app = createApp({
  //Checking if it is mounted properly.
  mounted(){
    console.log('checker to confirm if app is mounted properly.')
  }
});
//Mount app.
app.component('card',Card);
app.mount('#app');