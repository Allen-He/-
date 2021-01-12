class Pipe extends Rectangle {
    /**
     * @param {*} height 
     * @param {*} top 
     * @param {*} speedX 横向移动速度（需与land的横向移动速度一致）
     * @param {*} domEle 
     */
    constructor(height, top, speedX, domEle) { //height, top, domEle 动态生成
        super(52, height, wrapWidth, top, speedX, 0, domEle);

        this.render(); //初始化水管的位置
    }

    /** 柱子移动到wrap的左侧外部时,清除页面中对应的DOM元素 */
    onMove() {
        if (this.left < -this.width) {
            this.domEle.remove();
        };
    }
}

/** 生成范围在[min,max)的随机数 */
function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}


class PipePair {
    constructor(speed) {
        this.gap = 150; //两根水管的间隙
        this.minHeight = 80; //水管的最小高度
        this.maxHeight = wrapHeight - landHeight - this.minHeight - this.gap; //水管的最大高度

        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        const upDomHeight = getRandomNum(this.minHeight, this.maxHeight);
        this.upPipe = new Pipe(upDomHeight, 0, speed, upDom); //★

        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        const downDomHeight = wrapHeight - landHeight - upDomHeight - this.gap;
        const downDomTop = wrapHeight - landHeight - downDomHeight;
        this.downPipe = new Pipe(downDomHeight, downDomTop, speed, downDom); //★

        // 给当前“水管对”添加独一无二的“时间戳”(方便计算得分)
        this.idNum = new Date().getTime();

        wrap.appendChild(upDom);
        wrap.appendChild(downDom);
    }

    /** 该水管对是否已经移出了视野 */
    get useless() {
        return this.upPipe.left < -this.upPipe.width;
    }

    /** 移动水管对 */
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

    /** 是否为得分“水管对” */
    isScore() {
        // const scoreNum = document.querySelector('.score .num');
        // console.log(scoreNum.innerText)
        if(this.upPipe.left <= birdLeft - 52) {
            // scoreNum.innerText = parseInt(scoreNum.innerText) + 10;
            return true;
        }
        return false;
    }
}


class PipePairProducer {
    /**
     * @param {*} speed 水管移动的速度
     * @param {*} timeGap 每个水管对生产的间隔时间
     */
    constructor(speed, timeGap) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null; //用于生成水管对的定时器
        this.timeGap = timeGap;
    }

    /** 开始生成水管对 */
    startProduce() {
        if(this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push( new PipePair(this.speed) );
            // 移除没用的水管对
            for(let i = 0; i < this.pairs.length; i++) {
                const pair = this.pairs[i];
                if(pair.useless) { //水管对没用时，将其从数组this.pairs中移除
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.timeGap);
    }

    /** 停止生成水管对 */
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}



// const obj4 = new PipePairProducer(-100, 1800);
// obj4.startProduce();
// const timer = null;
// tiemr = setInterval(() => {
//     for(let i = 0; i < obj4.pairs.length; i++) {
//         obj4.pairs[i].move(16 / 1000);
//     }
// }, 16);

