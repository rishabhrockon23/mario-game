var obs,obsgroup,mushroum,turteles;
var coinimage,coingroup,score=0;
var brickimage,brickgroup;
var bg,bgimage,mario,marioruning,ground,mariodeath
var coinsound,jumpsound,diesound
var state="play"
var restart,restartimg

//loadexternalfiles
function preload(){
        brickimage=loadImage("images/brick.png")
        bgimage = loadImage("images/bgnew.jpg");
            mushroum=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
        turteles=loadImage("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png" )
            coinimage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
        mariorunning=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png")
        mariodeath=loadAnimation("images/dead.png")
        coinsound=loadSound("sounds/coinSound.mp3")
        jumpsound=loadSound("sounds/jump.mp3")
        diesound=loadSound("sounds/dieSound.mp3")
        restartimg=loadImage("images/restartimg.jpg")

        
}
//enitalenviroment
function setup() {
            createCanvas(1000, 600);
            bg=createSprite(500,300);
            bg.addImage(bgimage);
            bg.scale=0.5                    
            bg.velocityX=-6
            mario=createSprite(200,500,20,50)
            mario.addAnimation("running",mariorunning)
            mario.addAnimation("death",mariodeath)
            mario.scale=0.3
            ground=createSprite(200,580,400,10)
            ground.visible=false
            brickgroup=new Group()
            coingroup=new Group()
            obsgroup=new Group()
            restart=createSprite(width/2,height/2)
            restart.visible=false
            restart.addImage(restartimg);
}
//continewisleyexecute line of cofe
function draw() {
    
            background(51);
            //game runs in play mode
            if (state=="play"){
                        //scroll background

                        if (bg.x<100){

                            bg.x=bg.width/4   
                        }
                        //mario jumps on space button
                        if (keyDown("space")){
                            mario.velocityY=-10
                            //jumpsound.play()

                        }
                        //prevent mario 2 go out of the screen
                        if (mario.y<50){
                            mario.y=50

                        }
                        //prevent mario 2 go out of the screen
                        if (mario.x<200){
                            mario.x=200
                        }
                        //gravity 
                        mario.velocityY=mario.velocityY+1
                        //prevents mario form falling down due to gravity
                        mario.collide(ground  )
                        //call the function to generate bricks
                        genratebricks()
                        for(var i = 0 ; i<brickgroup.length;i ++){ 
                            var temp = brickgroup.get(i);
                            if (temp.isTouching(mario)){
                                mario.collide(temp)
                            }

                        }
                        //call the genarate coins
                        coingenarate();
                        for(var i =0 ;i<coingroup.length;i++){
                            var temp = coingroup.get(i);
                            if (temp.isTouching(mario)){
                                temp.destroy()
                                temp=null
                                score++
                                console.log(score)
                                //coinsound.play()
                            }
                        }
                        //call the function to generate obsticals
                        obsgenarate()
                        //chack if mario is intracting with obsticales
                        for(var i = 0;i<obsgroup.length;i++){
                            var temp=obsgroup.get(i)
                            if(temp.isTouching(mario)){
                                state="end"

                            }
                        }
            }

            //game runs in end mode
            else if (state=="end"){
                
                //velocity of background,mario is made to 0
                bg.velocityX=0
                mario.velocityX=0
                bg.velocityY=0
                mario.velocityY=0
                //to stop coin,brick,obsticles in the group 
                //velocity=0
                obsgroup.setVelocityXEach(0)
                coingroup.setVelocityXEach(0)
                
                brickgroup.setVelocityXEach(0)
                //lifetime is made to infinty so that they can be seen for a long time 
                brickgroup.setLifetimeEach(-1)
                obsgroup.setLifetimeEach(-1)
                coingroup.setLifetimeEach(-1)
                //change mario image for end mod 
                mario.changeAnimation("death",mariodeath)
                mario.y=570
                //play die sound 
                diesound.play()
                //make the score to    v 0 
                score=0
                restart.visible=true
                if (mousePressedOver(restart)) {
                    restartgame()
                }

            }

            

    
            
            //draw sprit on the screen
            drawSprites();
            //Sets/gets the current font size.
            textSize(32);
            //Sets the color used to fill shapes. 
            fill(255, 204, 0);
            //Sets the width of the stroke used for lines, points and the border around shapes.
            //All widths are set in units of pixels.
            strokeWeight(4);
            //Sets the color used to draw lines and borders around shapes.
            stroke(4);
            //Draws text to the screen. Displays the information specified in the first parameter on the screen in
            //the position specified by the additional parameters. 

            text("score="+score,500,50)

}
//genratebricks at every 70 frame
function genratebricks (){
    if(frameCount%70==0){
        var brick=createSprite(1000,200);
        brick.y=random(100,400)
        brick.addImage(brickimage);
        brick.velocityX=-8
        brick.scale=random(0.5,1)
        brick.lifetime=250
        brickgroup.add(brick)  
    }
    

}
//genrate coin at 100 frame
 function coingenarate() {
     if(frameCount%100==0){
         var coin=createSprite(1000,200,40,10);
         coin.velocityX=-6
         coin.addAnimation("coin",coinimage)
         coin.scale=(0.1);
         coin.lifetime=250
         coin.y=random(100,400);
         coingroup.add(coin);
         
     }
 }
 //genrate obsticale for every 100 frame
 function obsgenarate() {
     if(frameCount%100==0) {
         var obssprite=createSprite(1200,545,20,40)
         obssprite.velocityX=-4
         var rand=Math.round(random(1,2))
         obssprite.scale=(0.1)
         console.log(rand)
         switch(rand){
             case 1:obssprite.addAnimation("mushroum",mushroum);
             break;
             case 2:obssprite.addAnimation("turteles",turteles);
             break;
             
         }
         obssprite.lifetime=300
         obsgroup.add(obssprite)
     }
    
 }
 function restartgame() {
     state="play"
     brickgroup.destroyEach()
     coingroup.destroyEach()
     obsgroup.destroyEach()
     restart.visible=false
     score=0
     mario.changeAnimation("running",mariorunning)
 }            

 