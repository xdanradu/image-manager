

function run() {

    new Vue({
        el: '#app',
        data: {
            file: null,
            images: []
        },
        created: function() {
            this.getImages();
        },

        methods: {
            upload: function() {
                //const file = $('#file')[0].files[0];
                //upload(file).then(()=>{

                //});
                //you need an event handler here to reload the files from the backend -> RxJs Observables?+
                upload.then(()=>{
                  console.log('up');
                    this.getImages();
                })
            },
            remove: function (image) {
                axios.delete('http://localhost:3000/images/'+image).then(response => {
                    this.getImages();
                });

            },
            getImages: function() {
                axios.get('http://localhost:3000/images').then(response => {
                    this.images = response.data.files;
                });
            },
            onDeleted: function(evt) {
                this.getImages();
            }
        }
    });




}

document.addEventListener('DOMContentLoaded', () => {
    run();
});



