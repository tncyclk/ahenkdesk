import { createStore } from "vuex";

const store = createStore({
    state:{
        messageArray:[],
        serviceState:false,
        checkService:true,
    },
    getters:{
        __getMessageArray(state){
            return state.messageArray
        },
        __getServiceState(state){
            return state.serviceState
        },
        __getCheckService(state){
            return state.checkService
        }
    },
    mutations:{
        updateMessageArray(state, newArray){
            state.messageArray=newArray
        },
        updateServiceState(state,newServiceState){
            state.serviceState=newServiceState
        },
        updateCheckService(state){
            state.checkService=!state.checkService
        }
    }
})

export default store