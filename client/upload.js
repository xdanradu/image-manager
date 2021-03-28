const isAdvancedUpload = function () {
    const div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

if (isAdvancedUpload) {
    $('.box').addClass('has-advanced-upload');
}


let droppedFile;

function draggingOver(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    $('.box').addClass('is-dragover');
}

function dragleave(ev) {
    ev.preventDefault();
    $('.box').removeClass('is-dragover');
}

function drop(ev) {
    ev.preventDefault();
    $('.box').removeClass('is-dragover');
    droppedFile = ev.dataTransfer.files[0];
    $('.file-label').html(`<strong>${ev.dataTransfer.files[0].name}</strong>`);
}

function fileAdd(){
    droppedFile = document.getElementById('file').files[0];
    $('.file-label').html(`<strong>${document.getElementById('file').files[0].name}</strong>`);
}

function uploadFile() {
    if (droppedFile) {
        upload(droppedFile);
    } else {
        $('.box').css('outline', '2px dashed red');
        setTimeout(()=>{
            $('.box').css('outline', '2px dashed #aaa');
        }, 500);

        throw new Error('No file selected');
    }

}

function upload (file) {
    return new Promise(resolve => {
        let formData = new FormData();
        let blob = new Blob([file], {type: file.type, filename: 'img.png'});
        formData.append("file", blob);
        axios.post('http://localhost:3000/upload', formData).then(response => {
            //this.getImages();//send upload event from vue component
            console.log('saved');
            resolve();
        });
    });
}
