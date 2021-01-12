const wrap = document.querySelector('.game');
const wrapStyle = getComputedStyle(wrap);
const wrapWidth = parseFloat(wrapStyle.width);
const wrapHeight = parseFloat(wrapStyle.height);

const bird = document.querySelector('.bird');
const birdStyle = getComputedStyle(bird);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop= parseFloat(birdStyle.top);

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, bird);
        
        this.g = 600;//重力加速度(纵向的速度)
        this.swingStatus = 1; //小鸟翅膀的状态(1、2、3)
        this.timer = null; //改变小鸟翅膀状态的定时器
    }

    /** 小鸟开始煽动翅膀 */
    startSwing () {
        if(this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3 + 1;
            this.render();
        }, 100);
    }
    /** 小鸟停止煽动翅膀 */
    stopSwing () {
        clearInterval(this.timer);
        this.timer = null;
    }

    /** 重写render方法 */
    render() {
        super.render();
        this.domEle.className = `bird swing${this.swingStatus}`;
    }

    /** 纵向做加速运动 */
    onMove(duration) {
        // 纵向加速
        this.speedY = this.speedY + this.g * duration;
        // 小鸟飞的边界判断：是否掉在地上；是否飞到天空最顶部
        this.birdTopMax = wrapHeight - landHeight - birdHeight;
        if(this.top >= this.birdTopMax) {
            this.top = this.birdTopMax;
            this.speedY = 0;
        }else if(this.top <= 0) {
            this.top = 0;
        }
    }

    /** 小鸟向上飞  @param {*} dis - 传入小鸟的jump的高度的绝对值 */
    jump(disAbs) {
        this.speedY = -disAbs;
    }
}



// const obj3 = new Bird();
// obj3.startSwing();
// setInterval(() => {
//     obj3.move(16 / 1000);
// }, 16);