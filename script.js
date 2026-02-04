class ValentinesDayCard extends Phaser.Scene {
    constructor() {
        super("ValentinesDayCard");
    }
    
    preload() {
        this.load.image('heart1', 'inima1.png');
        this.load.image('heart2', 'inima2.png');
        this.load.image('heart3', 'inima3.png');
        this.load.image('heart4', 'inima4.png');
        this.load.image('heart5', 'inima5.png');
        this.load.image('heart6', 'inima6.png');
        this.load.image('heart7', 'inima7.png');

        this.load.image('bg', 'BackGround.png');
        this.load.image('yesNo', 'YesNo.png');
        this.load.image('catGif', 'catGif.gif');
        this.load.image('cat','Cat2.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#fec7cf');

        const rectWidth = 400;
        const rectHeight = 300;
        const rectX = (this.sys.game.config.width - rectWidth) / 2;
        const rectY = (this.sys.game.config.height - rectHeight) / 2;

        const rectangle = this.add.image(rectX + rectWidth / 2, rectY + rectHeight / 2, 'bg').setDisplaySize(rectWidth, rectHeight).setScale(3);
        rectangle.setDepth(1);
        const cat = this.add.image(rectX+200,rectY , 'catGif').setScale(1.4);

        cat.setDepth(2);

        const text = this.add.text(rectX-45,rectY+200, 'Will you be my Valentine?',{
            fontStyle: 'italic',
            font: '32px',
            fontSize: '24px',
            color: '#000000',
            align: 'center',
        })
        text.setOrigin(0);
        text.setDepth(2);

        const yesButton = this.add.image(rectX + 40, rectY + 280, 'yesNo').setScale(1.2).setInteractive();
        yesButton.setDepth(2);
        const yesText = this.add.text(yesButton.x, yesButton.y, 'Yes', {
            fontSize: '18px',
            color: '#000000',
        }).setOrigin(0.5).setDepth(3);

        yesButton.on('pointerdown', () => {
            text.setText('Yay!Happy Valentine\'s Day!\n I LOVE YOU❤️');
            yesButton.disableInteractive();
            noButton.disableInteractive();
            yesButton.setVisible(false);
            yesText.setVisible(false);
            noButton.setVisible(false);
            noText.setVisible(false);
            cat.setTexture('cat');
            console.log('Yes clicked!');
        });

        const noButton = this.add.image(rectX + 350, rectY + 280, 'yesNo').setScale(1.2).setInteractive();
        noButton.setDepth(2);
        const noText = this.add.text(noButton.x, noButton.y, 'No', {
            fontSize: '18px',
            color: '#000000',
        }).setOrigin(0.5).setDepth(3);

        noButton.on('pointerdown', () => {
            const newY = Phaser.Math.Between(0, this.sys.game.config.height);
            const newX = Phaser.Math.Between(0, this.sys.game.config.width);
            noButton.setPosition(newX, newY);
            noText.setPosition(newX, newY);
            console.log('No clicked!'); 
        });

        this.image = this.physics.add.group();

        const spawnHearts = () => {
            const heartTypes = ['heart1', 'heart2', 'heart3', 'heart4', 'heart5', 'heart6', 'heart7'];
            const randomHeart = Phaser.Utils.Array.GetRandom(heartTypes);
            const xPosition = Phaser.Math.Between(0, this.sys.game.config.width);
            const heart = this.image.create(xPosition, 0, randomHeart);
            heart.setVelocityY(300);
            heart.setScale(0.2);
        };

        this.time.addEvent({
            delay: 10,
            callback: spawnHearts,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.image.children.entries.forEach(heart => {
            if (heart.y > this.sys.game.config.height) {
                heart.destroy();
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: ValentinesDayCard,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);