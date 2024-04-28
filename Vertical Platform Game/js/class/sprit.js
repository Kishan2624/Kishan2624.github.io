class Sprit {
  constructor({ position, imageSrc,frameRate = 1,frameBuffer = 5,scale = 1 }) {
    this.position = position;
    this.image = new Image();
    this.loaded = false
    this.image.onload = () => {
      this.width = (this.image.width/this.frameRate)*this.scale;
      this.height = this.image.height*this.scale;
      this.loaded = true
    };
    this.image.src = imageSrc;
    this.frameRate = frameRate;
    this.currentFrame  = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
    this.scale = scale;
  }

  draw() {
    if (!this.image) return;
    const cropBox = {
      positon: {
        x: this.currentFrame * (this.image.width/this.frameRate),
        y: 0,
      },
      width:this.image.width/this.frameRate,
      height: this.image.height,
    };
    c.drawImage(
      this.image,
      cropBox.positon.x,
      cropBox.positon.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  update() {
    this.draw();
    this.updateFrames();
  }

  updateFrames(){
    this.elapsedFrames++
    if(this.elapsedFrames % this.frameBuffer === 0){
        if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
        else this.currentFrame = 0;
    }    
  }
}
