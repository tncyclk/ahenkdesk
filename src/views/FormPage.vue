<template>
    <Button class="back-button" @click="this.$router.push({name:'home'})">Geri</Button>
    <div class="formContainer">
        <h2 class="heading"> Hata Bildirin </h2>
        <label for="name">İsim ve Soyisim</label>
        <InputText id="name" type="text" v-model="name"></InputText>
        <label for="unit">Biriminiz</label>
        <Dropdown id="unit" v-model="selectedUnit"  :options="units" placeholder="birim seçin..."></Dropdown>
        <label for="subject"> Konu</label>
        <InputText id="subject" type="text" v-model="subject"></InputText>
        <label for="error">Hata</label>
        <Textarea id="error" v-model="error" rows="5" cols="15"></Textarea>
        <Button class="submitForm" @click="handleSubmit">Gönder</Button>
        <MessageBox v-if="messageSent" severity="success">Mesajınız Gönderildi</MessageBox>
        <MessageBox v-if="requireMessage" severity="warn">Bütün Alanları Doldurunuz !!</MessageBox>
    </div>
    
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
    export default {
        data(){
            return{
                name:null,
                selectedUnit:null,
                subject:null,
                error:null,
                valueArray:[],
                messageSent:false,
                units:[
                    "LiderAhenk",
                    "Ahtapot",
                    "Engerek",
                    "Altyapı",
                ],
                requireMessage:false,
            }
        },
        components:{
            Textarea,
            Dropdown
        },
        methods:{
            handleSubmit(){
                if(this.name==null || this.selectedUnit==null || this.subject==null || this.error==null){
                    this.requireMessage=true;
                    setTimeout(()=>{
                        this.requireMessage=false
                    }, 2000)
                }else{
                    this.valueArray.push({
                        name:this.name,
                        unit:this.selectedUnit,
                        subject:this.subject,
                        error:this.error,
                    })
                    this.messageSent=true
                    this.$store.commit("updateMessageArray",this.valueArray)
                    setTimeout(()=>{
                        this.messageSent=false
                        this.$router.push({name:"home"})
                    }, 2000)    
                }
                            
            }
        }
}
</script>
<style>
    .formContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .formContainer > * {
        margin-bottom: 5px;
        width:50%
    }
    .submitForm{
        max-width: 100px;
    }
    .heading{
        margin-bottom: 25px;
    }
    .back-button{
        float:right;
    }

</style>