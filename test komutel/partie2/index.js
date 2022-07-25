var express = require('express');
var app = express();
app.use(express.static("public"));

  


const feux = [10, 11, 12, 13, 14, 15]
let vitesse = 5 ;


function verification(feux , vitesse){

  let sommeSeconde = 0 ;
  let HorsFeuDebut = 150/vitesse;


  if (HorsFeuDebut >= feux[0]) {
    sommeSeconde = (2*HorsFeuDebut + (feux[0] - (HorsFeuDebut%10))) ;
    console.log( "feu 0 = " + sommeSeconde)
}
else {sommeSeconde = ( 2*HorsFeuDebut) ;
      console.log( "feu 0 = " + sommeSeconde);}  

for (let index = 1; index < feux.length; index++) {

if ((Math.trunc(sommeSeconde/(feux[index]))%2)!=0) { 
sommeSeconde = (sommeSeconde + (feux[index] - (sommeSeconde%10)) + HorsFeuDebut) ;
console.log( "feu "+index+" = " + sommeSeconde)

}
else {sommeSeconde = (sommeSeconde + HorsFeuDebut) ;
console.log( "feu "+index+" = " + sommeSeconde)}  

}

console.log("Durée Finale = "+ (sommeSeconde))


}












  app.listen(4000, function () {

console.log("************* Feux : [10, 10, 10] , Vitesse :  30 ***********")

    verification([10, 10, 10] , 30) ;

console.log("************* Feux : [10, 10, 10] , Vitesse :  20 ***********")

    verification([10, 10, 10] , 20) ;


console.log("************* Feux : [10, 20, 30] , Vitesse :  20 ***********")

    verification([10, 20, 30] , 20) ;

 console.log("************* Feux : [60, 60, 60, 60, 60, 60, 60, 60, 60, 60] , Vitesse :  5 ***********")

    verification([60, 60, 60, 60, 60, 60, 60, 60, 60, 60] , 5) ;
  });



  
