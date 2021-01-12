const sky = document.querySelector('.sky');
const skyStyle = getComputedStyle(sky);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
const skyLeft = parseFloat(skyStyle.left);
const skyTop= parseFloat(skyStyle.top);

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, skyLeft, skyTop, -60, 0, sky);
    }

    /** 判断sky的位置是否到了临界点，以便及时重置其位置 */
    onMove() {
        if(this.left < -skyWidth / 2) {
            this.left = 0;
        };
    }
}


// const obj1 = new Sky();
// setInterval(() => {
//     obj1.move(16 / 1000);
// }, 16);