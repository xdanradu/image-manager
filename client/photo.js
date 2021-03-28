Vue.component('photo', {
    props: ['path', 'filename'],
    template: '<div class="photo-container ">' +
        '<div class="photo" :style="{ backgroundImage: `url(${imgsrc})` }"></div>'+
        '<div class="delete-button" v-on:click="remove()">&#10006;</div>'+
        '<div class="lds-ripple" v-if="loading" ><div></div><div></div></div>'+
        '</div>',
    data: function() {
        return  {
            loading: true,
            imgsrc: ''
        }
    },
    created() {
        let myImage = new Image();
        myImage.src = this.path;
        myImage.onload = () => {
            this.imgsrc = myImage.src
            this.loading = false;
        }
    },
    methods: {
        remove: function () {
            axios.delete('http://localhost:3000/images/'+this.filename).then(response => {
                this.$emit('deleted', 'true')
            });
        },
    }
});
