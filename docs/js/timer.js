function Timer(doms, dur){
    this.doms = doms;
    this.dur = dur;
    this.easing = function(p){return p};
}

Timer.prototype.onFinished = function(){
    console.log('animation finished');
}

Timer.prototype.onProgress = function(p){ }

Timer.prototype.start = function(){
    this.p = 0;
    this.startTime = Date.now();

    const self = this;
    requestAnimationFrame(function f(){
        if(self.p >= 1){
            self.onProgress(self.easing(1.0));
            self.onFinished();
        }else{
            self.p = (Date.now() - self.startTime) / self.dur;
            self.onProgress(self.easing(self.p));
            requestAnimationFrame(f);
        }
    });  
}

export default Timer