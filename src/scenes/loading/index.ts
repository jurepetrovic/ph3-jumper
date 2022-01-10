
import { GameObjects, Scene } from 'phaser';
import { Player } from '../../classes/player';

export class LoadingScene extends Scene {

  private platforms! : GameObjects.Group;
  private player!: Player;
  private cursors!:Phaser.Types.Input.Keyboard.CursorKeys;
  private score:number;

  constructor() {

    super('loading-scene');
    this.score = 0;
  }


  create(): void {
    
    console.log('Loading scene was created');
    const world = {
      width: 800, // the width of 2 ground platforms
      height: 600 // the hight of the game
    };

    // the width and height of the world map
    this.cameras.main.setBounds(0, 0, world.width, world.height);
    this.physics.world.setBounds(0, 0, world.width, world.height);

    //  A simple background for our game - draw the sky
    var bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'sky');
    bg.setOrigin(0);
    // scale to full height, width
    let ratio = this.cameras.main.height/600;
    console.log(`ratio=${ratio}`);
    bg.setScale(Math.max(ratio, 1));


    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    // Here we create the ground.
    console.log(`camera height=${this.cameras.main.height}, width=${this.cameras.main.width}`);
    const ground = this.platforms.create(200, this.cameras.main.height-20, 'ground');
    this.platforms.create(600, this.cameras.main.height-20, 'ground');

    //ground.setScale(4, 1);
    
    // we create 2 ledges
    let ledge = this.platforms.create(700, 400, 'ground');
    let highLedge = this.platforms.create(100, 200, 'ground');

    // add the player
    this.player = new Player(this, 100, 400);
    this.player.setBounceY(0.3);

    // add diamonds
    let diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 10,
      setXY: { x: 150, y: 0, stepX: 70 }
    });

    diamonds.children.iterate(child => {

      // cast to proper type
      let child2 = child as Phaser.Physics.Arcade.Sprite;
      child2.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5)); 

      child.setInteractive().on('pointerdown', () => {
        console.log('star body', child.body);
        console.log('you hit a star');
      });
    });

    // add score text
    let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px'});
    scoreText.setFill('#000');
    scoreText.setOrigin(0);
    scoreText.setScrollFactor(0);

    // collect a star
    const collectDiamond = (player: any, star: any) => {

      star.disableBody(true, true);
      this.score += 10;
      scoreText.setText('Score: ' + this.score);
      //scoreTextSafeArea.setText('Score: ' + score)
    }

    // add collider and overlap
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(diamonds, this.platforms);
    // handler for diamonds
    this.physics.add.overlap(this.player, diamonds, collectDiamond);

    // add cursors
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  preload(): void {

    this.load.baseURL = 'assets/';
    // key: 'sky'
    // path from baseURL to file: 'sprites/sky.png'
    this.load.image('sky', 'sprites/sky.png');
    this.load.image('ground', 'sprites/platform.png');
    this.load.image('diamond', 'sprites/diamond.png');
    this.load.spritesheet('woof', 'sprites/woof.png', {frameWidth:32, frameHeight:32});

  }

  // update method 
  update(): void {

    this.player.update(this.cursors);
  }


}