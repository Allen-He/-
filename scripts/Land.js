const land = document.querySelector('.land');
const landStyle = getComputedStyle(land);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landLeft = parseFloat(landStyle.left);
const landTop= parseFloat(landStyle.top);

class Land extends Rectangle {
    /**
     * @param {*} speedX 横向移动速度
     */
    constructor(speedX) {
        super(landWidth, landHeight, landLeft, landTop, speedX, 0, land);
    }

    /** 判断land的位置是否到了临界点，以便及时重置其位置 */
    onMove() {
        if(this.left < -landWidth / 2) {
            this.left = 0;
        };
    }
}


// const obj2 = new Land(-100);
// setInterval(() => {
//     obj2.move(16 / 1000);
// }, 16);