var express = require("express");
var app = express();
app.use(express.static("public"));

// Dans cette méthode on fait le calcul du temps nécessaire pour depasser le premier feu si son etat est rouge.

function calculTempsPremierFeu(DelayPremierFeu, DelayAvantFeu) {
  return (
    2 * DelayAvantFeu + (DelayPremierFeu - (DelayAvantFeu % DelayPremierFeu))
  );
}

// Dans cette méthode on distingue l'etat du feu s'il est rouge ou bien vert

function testEtatFeu(SommeDuTemps, feu) {
  return Math.trunc(SommeDuTemps / feu) % 2;
}

// Dans cette méthode on fait le calcul du temps nécessaire pour dépasser les autres feux aprés le premier si son etat est rouge.

function calculTempsFeu(SommeDuTemps, feu, DelayAvantFeu) {
  return SommeDuTemps + (feu - (SommeDuTemps % feu)) + DelayAvantFeu;
}

// Dans cette méthode on fait le calcul global du temps de réponse en utilisant les méthodes définies ci-dessus.

function verificationGLobal(feux, vitesse) {
  // Une variable qui definie le temps necessaire globalement pour depasser tous les feux.
  let sommeSeconde = 0;

  // Une variable qui fait le calcul du temps depasser hors des l'intervalle des feux.
  let HorsFeuDebut = 150 / vitesse;

  if (HorsFeuDebut >= feux[0]) {
    sommeSeconde = calculTempsPremierFeu(feux[0], HorsFeuDebut);
  } else {
    sommeSeconde = 2 * HorsFeuDebut;
  }

  for (let index = 1; index < feux.length; index++) {
    if (testEtatFeu(sommeSeconde, feux[index])) {
      sommeSeconde = calculTempsFeu(sommeSeconde, feux[index], HorsFeuDebut);
    } else {
      sommeSeconde = sommeSeconde + HorsFeuDebut;
    }
  }

  console.log("\n=> La durée Finale = " + sommeSeconde);
}

app.listen(4000, function () {
  console.log("\nExemple 1 --  Feux : [10, 10, 10] , Vitesse :  30");

  verificationGLobal([10, 10, 10], 30);

  console.log("\nExemple 2 -- Feux : [10, 10, 10] , Vitesse :  20");

  verificationGLobal([10, 10, 10], 20);

  console.log("\nExemple 3 -- Feux : [10, 20, 30] , Vitesse :  20");

  verificationGLobal([10, 20, 30], 20);

  console.log("\nExemple 4 -- Feux : [10, 11, 12, 13, 14, 15] , Vitesse :  5");

  verificationGLobal([10, 11, 12, 13, 14, 15], 5);

  console.log(
    "\nExemple 5 -- Feux : [60, 60, 60, 60, 60, 60, 60, 60, 60, 60] , Vitesse :  5"
  );

  verificationGLobal([60, 60, 60, 60, 60, 60, 60, 60, 60, 60], 5);

  console.log(
    "\nExemple 5 -- Feux : [55, 29, 26, 12, 19, 39, 18, 20, 23, 28, 56, 20, 59, 48,33, 40, 30, 60, 19] , Vitesse :  25"
  );

  verificationGLobal(
    [
      55, 29, 26, 12, 19, 39, 18, 20, 23, 28, 56, 20, 59, 48, 33, 40, 30, 60,
      19,
    ],
    25
  );
});
