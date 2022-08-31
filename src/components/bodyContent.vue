<template>
    <div class="menu-container">
        <PanelMenu :model="items"></PanelMenu>
    </div>
    <div class="status-check">
        <h3>service status</h3>
        <div id="check" class="check" :class="[isActive ? 'active':'inActive' ]"></div>
    </div>
</template>

<script>
import checkStatus from "@/plugins/checkService"
export default {
    data(){
        return{
            items:[
                {
                    label:"Hata Bildir",
                    icon:"pi pi-exclamation-triangle",
                    command:this.goForm
                },
                {
                    label:"Mesaj Geçmişi",
                    icon:"pi pi-comments",
                    command:this.goMessage
                }
            ]
        }
    },
    computed:{
        isActive(){
            return this.$store.getters.__getServiceState
        }
        
    },
    methods:{
        goForm(){
            this.$router.push({name:"form"})
        },
        goMessage(){
            this.$router.push({name:"message"})
        }
    },
    mounted(){
        checkStatus()
    },
    beforeUnmount(){
        this.$store.commit("updateCheckService")
    }
}
</script>

<style>
    .status-check{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .check{
        border:1px solid black;
        border-radius: 50%;
        width:15px;
        height:15px;
    }
    .active{
        background-color: green;
    }
    .inActive{
        background-color: red;
    }
    .p-panelmenu{
        width:80%;


    }
    .p-panelmenu-header {
        margin-top: 15px;
    }
    .menu-container{
        display: flex;
        justify-content: center;
        width:30%;
        height:580px;
        background-color: aqua;
        float: left;
    }
</style>