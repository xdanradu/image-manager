const path = require("path");

function getCurrentDatetime() {
    let currentDate = new Date();
    let datetime = currentDate.getDate() + "-"
        + (currentDate.getMonth()+1)  + "-"
        + currentDate.getFullYear() + "_"
        + currentDate.getHours() + "-"
        + currentDate.getMinutes() + "-"
        + currentDate.getSeconds();
    return datetime;
}

function isAllowed(fileName) {
    return  ['.jpg', '.png'].includes(path.extname(fileName).toLowerCase())
        || fileName === 'blob';
}

module.exports = {
    getCurrentDatetime,
    isAllowed
}
