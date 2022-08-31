const {exec} = require("child_process")
import store from "@/store"

function delay(waitTime){
    return new Promise((resolve) => setTimeout(function(){resolve();}, waitTime))
}
// const checkElement = document.getElementById("check")
async function checkStatus(){
    while (store.getters.__getCheckService){
        exec("systemctl is-active cups.service",(error, stdout, stderr)=>{
            if(error || stderr){
                store.commit("updateServiceState", false)
                // checkElement.style.backgroundColor="green";
            }else if(stdout.trim()=="active"){
                store.commit("updateServiceState", true)
                //checkElement.style.backgroundColor="green";
            }else{
                store.commit("updateServiceState", false)
               // checkElement.style.backgroundColor="green";
            }
        })
        await delay(2000)
    }

}

export default checkStatus;