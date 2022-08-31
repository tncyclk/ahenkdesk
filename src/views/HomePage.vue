<template> 
    <header-comp/>
    <body-content/>
</template>

<script>

import headerComp from '@/components/headerComponent.vue';
import bodyContent from '@/components/bodyContent.vue';
export default {
    data(){
        return{
        }
    },
    components:{headerComp,bodyContent}
}
</script>