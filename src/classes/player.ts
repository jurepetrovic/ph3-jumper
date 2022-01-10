export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {

      super(scene, x, y, 'woof');
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.setCollideWorldBounds(true);
  
      scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('woof', { start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
      });
  
      /*
      scene.anims.create({
        key: 'turn',
        frames: [{ key: 'woof', frame: 2 }],
        frameRate: 20
      })
      */
  
      scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('woof', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
      })
    }
  
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
   
      if (cursors.left.isDown) {
      
        this.setVelocityX(-160 * 2);
        this.anims.play('left', true);
      } 
      else if (cursors.right.isDown) {
      
        this.setVelocityX(160 * 2);
        this.anims.play('right', true);
      } 
      else {
      
        this.setVelocityX(0);
        this.anims.stop();
        //this.anims.play('turn');
      }
  
      if (cursors.up.isDown && this.body.touching.down) {

        this.setVelocityY(-400 * 1.5);
      }
    }
  }