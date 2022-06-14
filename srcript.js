// odchytim si postavy
var posAndGun = document.getElementById('posAndGun');
var posRight = document.getElementById('posRight');
var posRunRight = document.getElementById('posRunRight');
var posLeft = document.getElementById('posLeft');
var posRunLeft = document.getElementById('posRunLeft');
// odchytim si zbran
var gunRight = document.getElementById('gunRight');
var gunLeft= document.getElementById('gunLeft');
var degree = 0 ;
// odchytim si enemies
var enemy1 = document.getElementById('enemy1');
var enemy2 = document.getElementById('enemy2');
var enemy3 = document.getElementById('enemy3');
// odchytim si strely nepriatela
var shot1 = document.getElementById('shot1');
var shot2 = document.getElementById('shot2');
var shot3 = document.getElementById('shot3');
var shot4 = document.getElementById('shot4');
var shot5 = document.getElementById('shot5');


// zavolanie funckie - pohyb enemies
moveEnemies(enemy1,900);
moveEnemies(enemy2,1300);
moveEnemies(enemy3,1800);

// zavolanie funckie - pohyb strely
moveShots(shot1,1000);
moveShots(shot2,2000);
moveShots(shot3,3000);
moveShots(shot4,4000);
moveShots(shot5,5000);

// key down na medzernik spusti move boolet 
window.addEventListener('keydown',(e)=>{
    if(e.keyCode==32){
        var bullet = document.createElement('div');
        bullet.classList.add('bullet');
        board.appendChild(bullet);
        // pozicia startu gulky 
        var rect = gunRight.getBoundingClientRect();
        // nastavim vysku strely
        bullet.style.top=rect.top+'px';
        // zavolam funkciu move bulet
        moveBullets(bullet,rect.left+50);
        }
        
    });

// key down pohyb postavicky a zbrane
window.addEventListener('keydown',(e)=>{
    var left = parseInt(window.getComputedStyle(posAndGun).getPropertyValue('left'));
    
    //left
    if(e.keyCode=='37' && left > 10 ){
        //postava a zbran pohyb vlavo
        posRight.id='posRunLeft';
        posAndGun.style.left = left - 10 + 'px';
        gunRight.id='gunLeft';
        if (gunRight){
            gunRight.style.transform='scaleX(0)';
        }
        
    }
    //right
    else if(e.keyCode=='39' && left <700){
        //postava a zbran pohyb vpravo
        posRight.id='posRunRight';
        gunRight.id='gunRight';
        posAndGun.style.left = left + 10 + 'px';
        
    }
    //up zbran hore
    else if(e.keyCode=='38' ){
        if (degree>-20 ){
            degree -= 5; 
        }
        rotate(gunRight);
                
    }
    //down zbran dole
    else if(e.keyCode=='40' ){
        if (degree < 0) {
            degree += 5;
        } 
        rotate(gunRight);      
    }
})

// keyUp zastavenie postavicky 
window.addEventListener('keyup',(e)=>{
    left = parseInt(window.getComputedStyle(posAndGun).getPropertyValue('left'));
    //left
    if(e.keyCode=='37'){
        //zastavenie 
        posRight.id='posRight';       
        
    }
    //right
    else if(e.keyCode=='39'){
        //zastavenie
        posRight.id='posRight';
    }
})

// funkcia mierenie zbrane
function rotate(element, rotation = degree) {
    element.style.transform = 'rotate(' + rotation + 'deg)';
  }

// funkcia move enemies
function moveEnemies(enemy,position) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame,1);
    function frame() {
        if( position==0){
            clearInterval(id);
        }
        else {
            position= position-0.1;
            enemy.style.left = position + 'px';
            // po preteceni vymaze nepriatelov
            if(position<-100){
                enemy.remove();
            }
        }
        
    }
}

// funkcia move enemy shots 
function moveShots(shots,position) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame,1);
    function frame() {
        if( position==100){
            clearInterval(id);
        }
        else {
            position= position-0.3;
            shots.style.left = position*2 + 'px';
            // po preteceni vymaze enemy shots
            if(position<-100){
                shots.remove();
            }
        }
    }
}

// funkcia move bullets
function moveBullets(Bullets,position) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame,1);
    function frame() {
        if( position==0){
            clearInterval(id);
        }
        else {
            position= position+1;
            Bullets.style.left = position + 'px';
            // po preteceni vymaze bulets
            if(position>1000){
                Bullets.remove();
            }
        }
    }
}

