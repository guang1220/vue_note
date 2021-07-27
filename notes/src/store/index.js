import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
   currentNoteId:'',
  },
  getters:{
    currentNoteId:state=>{
      let currentNoteId=state.currentNoteId
      if(!currentNoteId){
        currentNoteId=JSON.parse(window.sessionStorage.getItem('currentNoteId')||null)
      }
      return currentNoteId
    },
  },
  mutations:{
    setCurrentNoteId:(state,currentNoteId)=>{
      state.currentNoteId=currentNoteId
      window.sessionStorage.setItem('currentNoteId',JSON.stringify(currentNoteId))
    },

  },
  actions:{}
})
