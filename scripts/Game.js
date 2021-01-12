class Game {
    /**
     * 用户可选择游戏难易度
     * @param {*} land_pipe_speed 大地和水管移动的速度（传入负数）
     * @param {*} pipeProduce_Interval 生产“水管对”的间隔时间-映射到“水管对”间的间距（毫秒数）
     * @param {*} birdJump_disAbs 小鸟jump的高度（传入正数）
     */
    constructor(land_pipe_speed, pipeProduce_Interval, birdJump_disAbs) {
        this.sky = new Sky();
        this.land = new Land(land_pipe_speed);
        this.bird = new Bird();
        this.pipeProducer = new PipePairProducer(land_pipe_speed, pipeProduce_Interval);
        this.timer = null;
        this.tick = 16; //定时器的时间间隔，单位：毫秒
        this.gameOver = false;
        this.scorePair = {}; //存储得分“水管对”
        this.score = 0; //存储分数
        this.birdJump_disAbs = birdJump_disAbs; //小鸟jump的高度
    }

    /** 注册事件 */
    regEvent() {
        window.onkeydown = e => {
            // console.log(e.key);
            if(e.key === 'Enter') { //开始或暂停游戏
                if(this.timer) {
                    this.stop();
                }else {
                    this.start();
                }
            }else if(e.key === ' ') { //小鸟飞
                this.bird.jump(this.birdJump_disAbs);
            }
        }
    }

    /**
     * 判断两个矩形是否发生碰撞
     * @param {*} rec1 
     * @param {*} rec2 
     */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2); //中心点的横向距离
        const disY = Math.abs(centerY1 - centerY2); //中心点的纵向距离

        if(disX <= ((rec1.width + rec2.width) / 2) && disY <= ((rec1.height + rec2.height) / 2)) {
            return true;
        }
        return false;
    }

    /** 判断游戏是否结束 */
    isGameOver() {
        // 小鸟碰到大地，游戏结束
        if(this.bird.top >= this.bird.birdTopMax) {
            return true;
        }
        // 小鸟碰到水管，游戏结束
        const pairs = this.pipeProducer.pairs;
        for(let i = 0; i < pairs.length; i++) {
            const up = pairs[i].upPipe;
            const down = pairs[i].downPipe;
            if(this.isHit(this.bird, up) || this.isHit(this.bird, down)) {
                return true;
            }
        }
    }

    /** 开始游戏 */
    start() {
        if(this.timer) {
            return;
        }
        if(this.gameOver) {
            this.restart(); //重新开始游戏
        }

        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach((pair, index) => {
                pair.move(duration);
                if(pair.isScore()) { //动态存储得分“水管对”
                    if(!this.scorePair[pair.idNum]) {
                        this.scorePair[pair.idNum] = 'a';
                    }
                }
            });

            // 更新得分
            // console.log(this.scorePair);
            this.score = Object.keys(this.scorePair).length * 10;
            const scoreNum = document.querySelector('.score .num');
            scoreNum.innerText = this.score;
            if(this.score == 1000) {
                this.end();
                alert('恭喜你~~~顺利通关啦！');
            }

            if(this.isGameOver()) {
                this.end();
                alert('游戏结束，你的得分为：' + this.score);
            }
        }, this.tick);
    }
    
    /** 暂停游戏 */
    stop() {
        this.pipeProducer.stopProduce();
        this.bird.stopSwing();
        clearInterval(this.timer);
        this.timer = null;
    }

    /** 结束游戏 */
    end() {
        this.stop();
        this.gameOver = true;
    }

    /** 重新开始 */
    restart() {
        window.location.reload(); //刷新页面
    }
}


const game = new Game(-100, 1800, 150);
game.regEvent();
 //初始化得分
const scoreNum = document.querySelector('.score .num');
scoreNum.innerText = '0';