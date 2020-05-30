enchant();
window.onload = function(){
	var core = new Core(700,1000);
	core.preload('hori1.png','background1.png','window1.png','bluedragon.png','monster2.gif','monster3.gif','gameover.png','start.jpg','sword1.png','box.png','swordicon.jpg','boss1.png','sickle.png','effect1.png',);
	core.fps = 20;
	core.onload = function(){
		
		var createHomeScene = function(){
			var HomeScene = new Scene();
			
			var background = new Sprite(140,200);
			background.image = core.assets['start.jpg'];
			background.x = 270;
			background.y = 400;
			background.scaleX = 5;
			background.scaleY = 5;

			HomeScene.addChild(background);
			
			var touchcheck = 0;
			
			var Infoversion = new Label();
			Infoversion.text = 'ver 1.1.3';
			Infoversion.color = 'black';
			Infoversion.x = 10;
			Infoversion.y = 10;
			Infoversion.font = '43px MSゴシック';
			Infoversion.on('touchstart',function(){
				alert("ver1.1.3 : ボスの即死攻撃までの時間の延長/緊急回避のバグを修正/ボスを倒した後の蜘蛛の速さの調整/ドラゴンが少しずつ加速");
				touchcheck = 1;
			});
			HomeScene.addChild(Infoversion);
			
			var howtoplay = new Label();
			howtoplay.text = '遊び方';
			howtoplay.color = 'black';
			howtoplay.x = 10;
			howtoplay.y = 60;
			howtoplay.font = '43px MSゴシック';
			howtoplay.on('touchstart',function(){
				alert("タップでジャンプ（二段階ジャンプ可）/下の方をタップすると緊急回避/宝箱をとると剣が使えるようになる/ボスが出てきたらタイミング良く攻撃を避け、剣でダメージを与えて倒す/左上の「〜〜m」をタップでゲームを一時停止");
				touchcheck = 1;
			});
			HomeScene.addChild(howtoplay);

			
			var PlayButton = new Label();
			PlayButton.width = 1000;
			PlayButton.text = 'TAP TO START';
			PlayButton.color = 'green';
			PlayButton.x = 130;
			PlayButton.y = 200;
			PlayButton.font = "60px MSゴシック";
			HomeScene.addChild(PlayButton);
			HomeScene.on('touchstart',function(){
				if(touchcheck == 0){
				core.pushScene(createGameScene());
				}else{
					touchcheck = 0;
				}
			});
			
			
			
			
			return HomeScene;
		};
		
		core.replaceScene(createHomeScene()); 
		
		
		var createGameScene = function(){
			var GameScene = new Scene();
			GameScene.backgroundColor ='white';
			
			var GROUND_LINE = 650;
			var SCROLL_SPEED = 15;
			var scroll = 0;
			var spin = 25;
			var jumpLimit = 2;
			var jumps = 0;
			var gravity = 0;
			var Gspeed = 1.3;
			var upspeed = 0;
			var touchcheck = 0;
			var iconcheck = 0;
			var bosscheck = 0;
			var bosshp = 1000;
			var magicattack = 0;
			var boxx = 2300;
			var boxhitx = 2450;
			
			
			
			var hori = new Sprite(80,80);
			hori.image = core.assets['hori1.png'];
			hori.x = 80;
			hori.y = GROUND_LINE;
			hori.scaleX = 1.3;
			hori.scaleY = 1.3;
			hori.onenterframe = function (){
				hori.rotate(spin);
				box.rotate(1.6);
			};
			
			
			var dead = function(){
				alert("「ぐふっ...」");
				core.replaceScene(createGameoverScene(scroll));
			};
			
			
			var horihit = new Sprite (70,70);
			//horihit.image = core.assets['start.jpg'];
			horihit.x = hori.x ;
			horihit.y = hori.y ;

			
			var box = new Sprite (365,366);
			box.image = core.assets['box.png'];
			box.x =1600;
			box.y = 150;
			box.scaleX = 0.3;
			box.scaleY = 0.27;
			
			var boxhit = new Sprite (80,80);
			//boxhit.image = core.assets['start.jpg'];
			boxhit.x = 1750;
			boxhit.y = 295;
			
			
			var sword1 = new Sprite(393,395);
			sword1.image = core.assets['sword1.png'];
			sword1.scaleX =  0.35;
			sword1.scaleY = 0.35;
			sword1.rotate(225);
			
			var sword1hit = new Sprite(200,15);
			//sword1hit.image = core.assets['start.jpg'];
			sword1hit.x = 590;
			
			
			
			var swordicon = new Sprite(300,300);
			swordicon.image = core.assets['swordicon.jpg'];
			swordicon.x = 170;
			swordicon.y = 750;
			swordicon.scaleX = 0.43;
			swordicon.scaleY = 0.43
			swordicon.on('touchstart',function(){
				GameScene.removeChild(swordicon);
				sword1.x = 80;
				sword1hit.x = 170;
				sword1.y = hori.y - 160;
				sword1hit.y = hori.y + 30;
				GameScene.addChild(sword1);
				GameScene.addChild(sword1hit);
				sword1.tl.moveBy(720,0,20,);
				sword1hit.tl.moveBy(720,0,20);
				iconcheck = 0;
				GameScene.addChild(box);
				GameScene.addChild(boxhit);
			});
			
			
			
			var bluedragon = new Sprite (96,64);
			bluedragon.image = core.assets['bluedragon.png'];
			bluedragon.frame = 4;
			bluedragon.scaleX = 2;
			bluedragon.scaleY = 2;
			bluedragon.x = 1800;
			bluedragon.y = 300;
			
			var bluedragonhit = new Sprite (64,64);
			//bluedragonhit.image = core.assets['start.jpg'];
			bluedragonhit.x = 1787;
			bluedragonhit.y = 300;
			
			var bluedragonhit2 = new Sprite (64,64);
			//bluedragonhit2.image = core.assets['start.jpg'];
			bluedragonhit2.x = 1855;
			bluedragonhit2.y = 300;
		
			
			var bat = new Sprite (48,37);
			bat.image = core.assets['monster3.gif'];
			bat.frame = 2;
			bat.scaleX = 3;
			bat.scaleY = 3;
			bat.x = 1000;
			bat.y = 500;
			
			var bathit = new Sprite (70,70);
			//bathit.image = core.assets['start.jpg'];
			bathit.x = 985;
			bathit.y = 485;
			
			
			var monster2 = new Sprite (64,68);
			monster2.image = core.assets['monster2.gif'];
			monster2.frame = 2;
			monster2.scaleX = 3;
			monster2.scaleY = 3;
			monster2.x = 900;
			monster2.y = GROUND_LINE;
			
			var monster2hit = new Sprite (78,78);
			//monster2hit.image = core.assets['start.jpg'];
			monster2hit.x = 852;
			monster2hit.y = GROUND_LINE;
			
			var monster2hit2 = new Sprite (78,78);
			//monster2hit2.image = core.assets['start.jpg'];
			monster2hit2.x = 930;
			monster2hit2.y = GROUND_LINE;
			
			
			var boss1 = new Sprite(320,260);
			boss1.image = core.assets['boss1.png'];
			boss1.opacity = 0.0;
			boss1.scaleX = 1.5;
			boss1.scaleY =  1.5;
			boss1.x = 300;
			boss1.y = 200;
			
			var sickle = new Sprite (400,600);
			sickle.image = core.assets['sickle.png'];
			sickle.opacity = 0.0;
			sickle.x = 130;
			sickle.y = -20;
			sickle.scaleX = 0.5;
			sickle.scaleY = 0.5;
			sickle.rotate(-40);
			
			var magic = new Sprite(190,190);
			magic.image = core.assets['effect1.png'];
			magic.x = 30;
			magic.y = 570;
			
			var magichit = new Sprite (120,120);
			//magichit.image = core.assets['start.jpg'];
			magichit.x = 70;
			magichit.y = 620;
			
			var magic1 = new Sprite(190,190);
			magic1.image = core.assets['effect1.png'];
			magic1.x = 180;
			magic1.y = 200;
			
			var magic2 = new Sprite(190,190);
			magic2.image = core.assets['effect1.png'];
			magic2.x = 500;
			magic2.y = 170;
			
			var magic3= new Sprite(190,190);
			magic3.image = core.assets['effect1.png'];
			magic3.x = 540;
			magic3.y = 570;
			
			var magic4= new Sprite(190,190);
			magic4.image = core.assets['effect1.png'];
			magic4.x = 360;
			magic4.y = 370;
			
			

			
			
			
			var bg1 = new Sprite (98,129);
			bg1.image = core.assets['background1.png'];
			bg1.x = 245;
			bg1.y = 450;
			bg1.scaleX = 6;
			bg1.scaleY = 8;
			
			var bg2 = new Sprite (98,129);
			bg2.image = core.assets['background1.png'];
			bg2.frame = 1;
			bg2.x = 833;
			bg2.y = 450;
			bg2.scaleX = 6;
			bg2.scaleY = 8;
			
			var bg3 = new Sprite (98,129);
			bg3.image = core.assets['background1.png'];
			bg3.frame = 2;
			bg3.x = 1410;
			bg3.y = 450;
			bg3.scaleX = 6;
			bg3.scaleY = 8;
			
			var bg4 = new Sprite (98,129);
			bg4.image = core.assets['background1.png'];
			bg4.frame = 3;
			bg4.x = 1998;
			bg4.y = 450;
			bg4.scaleX = 6;
			bg4.scaleY = 8;
			
			
			var scoreLabel = new Label("");
			scoreLabel.color = 'red';
			scoreLabel.x = 30;
			scoreLabel.y = 30;
			scoreLabel.font = '60px monospace';
			scoreLabel.on('touchstart',function(){
				touchcheck = 1;
				alert("ゲーム再開");
			});
			
			var bosshpLabel = new Label("");
			bosshpLabel.color = 'red';
			bosshpLabel.x = 340;
			bosshpLabel.y = 80;
			bosshpLabel.font = '45px monospace';
			
			
			
			
			GameScene.on('touchstart',function(e){
				if(e.y <= 860){
				if(jumps < jumpLimit && touchcheck == 0){
				jumps = jumps + 1;
				hori.tl.moveBy(0,-410,10,enchant.Easing.CUBIC_EASEOUT);
				horihit.tl.moveBy(0,-410,10,enchant.Easing.CUBIC_EASEOUT);
				}else{touchcheck = 0;}
			}if(e.y > 860 && hori.y != GROUND_LINE){
				hori.tl.moveBy(0,GROUND_LINE,6);
				horihit.tl.moveBy(0,GROUND_LINE,6);
			}
			});

			
			
			
			GameScene.onenterframe = function(){	 
				
				//背景スクロール
				var A = 587;
				var B = 1410;
				bg1.x -= SCROLL_SPEED;
				bg2.x -= SCROLL_SPEED;
				bg3.x -= SCROLL_SPEED;
				bg4.x -= SCROLL_SPEED;
				if(bg1.x <= -A){
					bg1.x = B;
				}if(bg2.x <= -A){
					bg2.x = B;
				}if(bg3.x <= -A){
					bg3.x = B;
				}if(bg4.x <= -A){
					bg4.x = B;
				}
				
				//スコアラベル
				scroll += SCROLL_SPEED;
				scoreLabel.text = scroll.toString()+'m';
				
				
				
				
				
				
				if (bosscheck == 0){
					
					
				//配置&当たり判定
				var bluedragonminx = 70;
				var bluedragonmaxx = 180;
				var bluedragonranx = Math.floor(Math.random() * (bluedragonmaxx + 1 - bluedragonminx)) + bluedragonminx; 

				var batminx = 80;
				var batmaxx = 200;
				var batranx = Math.floor(Math.random() * (batmaxx + 1 - batminx)) + batminx; 
				
				var monster2minx = 40;
				var monster2maxx = 80;
				var monster2ranx = Math.floor(Math.random() * (monster2maxx + 1 - monster2minx)) + monster2minx; 
				
				if(scroll % bluedragonranx *15 === 0 && bluedragon.x < -100){
					bluedragon.x = 780;
					bluedragonhit.x = 767;
					bluedragonhit2.x = 830;
					GameScene.addChild(bluedragon);
					GameScene.addChild(bluedragonhit);
					GameScene.addChild(bluedragonhit2);
				}
				
				if(scroll % batranx*15 === 0&& bat.x <-100){
					bat.x = 750; //800
					bathit.x = 735; // 785
					GameScene.addChild(bat);
					GameScene.addChild(bathit);
				}
				
				if(scroll % monster2ranx*15 === 0 && monster2.x < -100){
					monster2.x = 800; //900
					monster2hit.x = 752;  //852
					monster2hit2.x = 823;
					GameScene.addChild(monster2);
					GameScene.addChild(monster2hit);
					GameScene.addChild(monster2hit2);
				}
			
				if(bluedragon.x > -400){
					if(bluedragonhit.within(horihit,(58)) || bluedragonhit2.within(horihit,(58))){
						dead();
					}
					if(bluedragonhit.intersect(sword1hit)){
						GameScene.removeChild(bluedragon);
						GameScene.removeChild(bluedragonhit);
						GameScene.removeChild(bluedragonhit2);
					}
					bluedragon.x -= SCROLL_SPEED * 1.4 + upspeed * 0.05;
					bluedragonhit.x -= SCROLL_SPEED * 1.4 + upspeed * 0.05;
					bluedragonhit2.x -= SCROLL_SPEED * 1.4 + upspeed * 0.05;
					if(bluedragon.frame > 6){
						bluedragon.frame = 4;
						} else {
							bluedragon.frame ++ ;
					}
				}
				
				
				if(bat.x > -300){
				if (bathit.within(horihit,(65))){
					dead();
				}
				if(bathit.within(sword1hit,(35))){
					GameScene.removeChild(bat);
					GameScene.removeChild(bathit);
				}
				bat.x -= SCROLL_SPEED * 1.6;
				bathit.x -= SCROLL_SPEED * 1.6;
					if(bat.frame > 3){
						bat.frame = 2;
						} else {
							bat.frame ++ ;
					}
				}
				
				
				if(monster2.x > -300){
					if(monster2hit.within(horihit,(74)) || monster2hit2.within(horihit,(70)) ){
						dead();
					}
					if(monster2hit.intersect(sword1hit)){
						GameScene.removeChild(monster2);
						GameScene.removeChild(monster2hit);
						GameScene.removeChild(monster2hit2);
					}
					monster2.x -= SCROLL_SPEED + upspeed;
					monster2hit.x -= SCROLL_SPEED + upspeed;
					monster2hit2.x -= SCROLL_SPEED + upspeed;
					if(monster2.frame > 3){
						monster2.frame = 2;
						} else {
							monster2.frame ++ ;
					}
				}
				
				//宝箱
				box.x -= SCROLL_SPEED;
				boxhit.x -= SCROLL_SPEED;
				if(scroll % 2490 === 0 && box.x < -400){
				box.x = 2500;
				boxhit.x = 2650;
				GameScene.addChild(box);
				GameScene.addChild(boxhit);
				}
				
				
				if(scroll % 3000){
				upspeed += 0.02;
				}
				
				
				
				} // ↑bosscheck == 0
				
				
				
				
				
				
				
				if(boxhit.within(horihit,(80)) && iconcheck == 0 ){
					box.x = boxx;
					boxhit.x = boxhitx;
					GameScene.addChild(swordicon);
					GameScene.removeChild(box);
					GameScene.removeChild(boxhit);
					iconcheck = 1;
				}
				

				//hori
				if(scroll % 3000){
				spin += 0.07;
				}
				if(hori.y < GROUND_LINE){
					gravity = gravity + Gspeed;
					hori.y += gravity;
					horihit.y += gravity;
				}else{
					gravity = 0;
					jumps = 0;
					hori.y = GROUND_LINE;
					horihit.y = GROUND_LINE;
				}
				horihit.x = hori.x + 13;
				horihit.y = hori.y + 8;
				
				
				
				
				//boss1
				if(scroll - 10005 === 0){
					bosscheck = 1;
					GameScene.removeChild(bluedragon);
					GameScene.removeChild(bluedragonhit);
					GameScene.removeChild(bluedragonhit2);
					GameScene.removeChild(monster2);
					GameScene.removeChild(monster2hit);
					GameScene.removeChild(monster2hit2);
					GameScene.removeChild(bat);
					GameScene.removeChild(bathit);
					GameScene.removeChild(box);
					GameScene.removeChild(boxhit);
					GameScene.addChild(sickle);
					GameScene.addChild(bosshpLabel);
					box.x = 700;
					boxx = 1400;
					boxhit.x = 850;
					boxhitx = 1550;
					boss1.tl.fadeIn(60,enchant.Easing.BOUNCE_EASEIN);
					sickle.tl.fadeIn(60,enchant.Easing.BOUNCE_EASEIN).moveBy(-10,-100,30,).rotateBy(1500,30);
					
					
				};
				
				
				if(bosscheck == 1){
					
					
					if(magic.frame > 8){
						magic.frame = 0
					}else{
						magic.frame ++;
					};
					
					
					if(magic1.frame > 8){
						magic1.frame = 0
					}else{
						magic1.frame ++;
					};
					
					if(magic2.frame > 8){
						magic2.frame = 0
					}else{
						magic2.frame ++;
					};
					
					if(magic2.frame > 8){
						magic2.frame = 0
					}else{
						magic2.frame ++;
					};
					
					if(magic3.frame > 8){
						magic3.frame = 0
					}else{
						magic3.frame ++;
					};
					
					if(magic4.frame > 8){
						magic4.frame = 0
					}else{
						magic4.frame ++;
					};
					
					bosshpLabel.text = 'HP ' + bosshp;
					
					box.x -= SCROLL_SPEED;
					boxhit.x -= SCROLL_SPEED;
					if(box.x < -400){
						box.x = 1400;
						boxhit.x = 1550;
						GameScene.addChild(box);
						GameScene.addChild(boxhit);
					}
					
					if(boss1.within(sword1hit,(100))){
						GameScene.removeChild(sword1);
						if(bosshp > 0){
							bosshp -= 40;
							bosshpLabel.text = 'HP ' + bosshp;
						}if(bosshp <= 0){
							boss1.tl.fadeOut(60,enchant.Easing.BOUNCE_EASEIN);
								GameScene.removeChild(boss1);
								GameScene.removeChild(bosshpLabel);
								GameScene.removeChild(sickle);
								GameScene.removeChild(magic);
								GameScene.removeChild(magichit);
								GameScene.removeChild(magic1);
								GameScene.removeChild(magic2);
								GameScene.removeChild(magic3);
								GameScene.removeChild(magic4);
								upspeed = 0.13;
								bosscheck = 0;
								boxx = 2300;
								boxhitx = 2450;
						}
						
					};
					
					if(magicattack ==1 && magichit.within(horihit,(15))){
						dead();
							};
					
					
					if(scroll % 2250 === 0 ){
						sickle.tl.scaleTo(0.7,5).scaleTo(0.5,5).scaleTo(0.7,5).scaleTo(0.5,5).scaleTo(0.7,5).scaleTo(0.5,5);
						sickle.tl.delay(12.5).then(function(){
							GameScene.addChild(magic);
							GameScene.addChild(magichit);
							GameScene.addChild(magic4);
							magicattack = 1;
						});
						sickle.tl.delay(4).then(function(){
							GameScene.addChild(magic1);
						});
						sickle.tl.delay(6).then(function(){
							GameScene.addChild(magic2);
						});
						sickle.tl.delay(4).then(function(){
							GameScene.addChild(magic3);
						});
						sickle.tl.delay(8).then(function(){
							GameScene.removeChild(magic1);
						});
						sickle.tl.delay(8).then(function(){
							GameScene.removeChild(magic2);
						});
						sickle.tl.delay(4).then(function(){
							GameScene.removeChild(magic4);
						});
						sickle.tl.delay(8).then(function(){
							GameScene.removeChild(magic3);
						});
						magic.tl.delay(23).then(function(){
							magicattack = 0;
							GameScene.removeChild(magic);
							GameScene.removeChild(magichit);
						});
					};
					
					
					
					//即死攻撃
					if(scroll - 24990 == 0){
						magicattack = 0;
						sickle.tl.rotateBy(-5500,13).scaleTo(0.9,3).moveBy(-110,440,5);
					};
					if(horihit.within(sickle,(109.79))){
							dead();	
						};
					
					
					
					
					
					
					};   //⇦ if (bosscheck==1)~~					
					
				
				
				
				};
				
				
				
			
		
		
		GameScene.addChild(bg1);
		GameScene.addChild(bg2);
		GameScene.addChild(bg3);
		GameScene.addChild(bg4);
		GameScene.addChild(hori);
		GameScene.addChild(horihit);
		GameScene.addChild(bluedragon);
		GameScene.addChild(bluedragonhit);
		GameScene.addChild(bluedragonhit2);
		GameScene.addChild(monster2);
		GameScene.addChild(monster2hit);
		GameScene.addChild(monster2hit2);
		GameScene.addChild(bat);
		GameScene.addChild(bathit);
		GameScene.addChild(scoreLabel);
		GameScene.addChild(boss1);
		GameScene.addChild(box);
		GameScene.addChild(boxhit);

		
		return GameScene;
		};
		
		createGameoverScene = function(scroll){
			
			var GameoverScene = new Scene();
			GameoverScene.backgroundColor = 'white';
			
			var gameoverImage = new Sprite(189,97);
			gameoverImage.image = core.assets['gameover.png'];
			gameoverImage.x = 250;
			gameoverImage.y = 250;
			gameoverImage.scaleX = 1.7;
			gameoverImage.scaleY = 1.7;
			
			var scoreLabel = new Label(scroll.toString());
			scoreLabel.width = 320;
			scoreLabel.textAlign = 'center';
			scoreLabel.color = 'black';
			scoreLabel.x = 200;
			scoreLabel.y = 420;
			scoreLabel.font = '80px sans-serif';
			
			var scoreInfoLabel = new Label('m転がった');
			scoreInfoLabel.width = 320;
			scoreInfoLabel.textAlign = 'center';
			scoreInfoLabel.color = 'black';
			scoreInfoLabel.x = 370;
			scoreInfoLabel.y = 505;
			scoreInfoLabel.font = '45px sans-serif';
			
			var replayLabel = new Label('もう一度プレイする');
			replayLabel.width = 600;
			replayLabel.textAlign = 'center';
			replayLabel.color = 'black';
			replayLabel.x = 70;
			replayLabel.y = 700;
			replayLabel.font = '45px sans-serif';
			replayLabel.on('touchstart',function(){
				core.replaceScene(createGameScene());
			});
			
			var returnhomeLabel = new Label('ホームへ戻る');
			returnhomeLabel.width = 320;
			returnhomeLabel.textAlign = 'center';
			returnhomeLabel.color = 'black';
			returnhomeLabel.x = 200;
			returnhomeLabel.y = 770;
			returnhomeLabel.font = '45px sans-serif';
			returnhomeLabel.on('touchstart',function(){
				core.replaceScene(createHomeScene());
			});
			
			
			
			GameoverScene.addChild(gameoverImage);
			GameoverScene.addChild(scoreLabel);
			GameoverScene.addChild(scoreInfoLabel);
			GameoverScene.addChild(replayLabel);
			GameoverScene.addChild(returnhomeLabel);
			
			
			return GameoverScene;
		};
		
		
		
		
		
		
		
	}
	core.start();
}