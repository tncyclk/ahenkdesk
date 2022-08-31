<template>
    <div class="button-group">
        <Button  @click="minWindow" class="p-button-secondary p-button-outlined" icon="pi pi-minus" />
        <Button  @click="maxWindow" class="p-button-secondary p-button-outlined" icon="pi pi-window-maximize" />
        <Button  @click="closeWindow" class="p-button-secondary p-button-outlined" icon="pi pi-times" />
    </div>
</template>
<script>
const {ipcRenderer} = require("electron")
export default {
    data(){
        return{
            visibleLeft:false,
       }
    },
    methods:{
        minWindow(){
            ipcRenderer.send("topright:min")
        },
        closeWindow(){
            ipcRenderer.send("topright:close")
        },
        maxWindow(){
            ipcRenderer.send("topright:max")
        }
    },
}
</script>
<style>
.frame{
    display: flex;
    top:0;
    left: 0;
    right: 0;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
.button-group{
    float:right;
}
.button-group > *{
    margin-right: 5px;
}
</style>