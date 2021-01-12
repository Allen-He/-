/**
 * 可移动的物体类（天空、大地、小鸟、水管的共有父类）
 * 该构造函数需要的参数：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的DOM元素
 * 注意：speed --- 单位: px/秒
 *  speedX < 0 向左运动；speedX > 0 向右运动
 *  speedY < 0 向上运动；speedY > 0 向下运动
 */
class Rectangle {
    constructor(width, height, left, top, speedX, speedY, domEle) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.domEle = domEle;
    }

    /** 重新渲染对应的DOM元素 */
    render() {
        this.domEle.style.width = this.width + 'px';
        this.domEle.style.height = this.height + 'px';
        this.domEle.style.left = this.left + 'px';
        this.domEle.style.top = this.top + 'px';
    }

    /**
     * 移动方法
     * @param {*} duration 持续时间 --- 单位：秒
     */
    move(duration) {
        const disX = this.speedX * duration;
        const disY = this.speedY * duration;
        this.left = disX + this.left;
        this.top = disY + this.top;

        // 如果存在this.onMove方法（该方法由子类定义），则判断对象的位置是否到达临界点，并做出反应
        if(this.onMove) {
            this.onMove(duration);
        }

        this.render();
    }
}


// const obj = new Rectangle(33,26,150,150,50,0,document.querySelector('.bird'));
