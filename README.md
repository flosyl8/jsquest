    J     
    J       
    J       
J J J a v a S c r i p t

***

#JAVASCRIPT GUIDE

##Structure de données

###Les types de données 

il existe six types de données primitifs :

* `"boolean"`

* `"nul"` 

* `"undefined"`

* `"number"` 

* `"string"`

* `"symbol"`

On peut également rajouter le type `"object"`

###Les valeurs primitives

Tout les types, sauf les objets, définissent des valuers immuables (impossible à modifier).
Les valeurs immuables sont appellés *valeurs primitives*.

* boolean `true`, `false`

* null : `null`

* undefined : `undefined`

* nombre : `1232, 0x363, 0b101001, 0o7727, 2,7638e10`

Contrairement à d'autres languages, il n'y a pas de type à part pour représenter
les eniters. Il existe également un objet Number, qui est un wrapper pour les nombres.
On le verra un peu plus bas.

* **string** : `"hello", "\nwordl", "red"`

Permet de représenter des données textuelles. Dans un niveau low-level, les strings
sont des ensembles d'éléments de valeurs entières non-signés codés sur 16 bits. Chaque 
élément occupe une position au sein de cette chaîne, en commençant par **0**.

Une chaine string est impossible à modifier, car c'est une valeur primitive. 

* **symbol** 

Arrivée avec ES6. On peut faire un parallèle entre les symboles et les enum de C.

* **objet**

En JS, on peut voir les objets comme des collections de propriétés. Il existe
quatres moyens de créers des objets : littéralement, via un constructeur, via une 
méthode de l'objet global Object et via le sucre syntaxique classe. Voir plus bas.

On dit que les propriétés sont identifiés par une clé, une "key". C'est soit un 
string soit un symbole. 

Il existe deux types de propriétés : **les data property** et les **accessor property**

*Attribut des Propriétés de données**

Elles associent une clé avec une valeur et possèdent les attributs suivants :

`[[Value]]` : la valeur obtenue lorsqu'on accède à la propriété. Tout type de valeur
`undefined` par défaut.

`[[Writable]]` : Si `false`, la propriété ne peut être écrite. false par défaut.

`[[Enumerable]]` : Si `true`, la propriété sera listé par une boucle `for...in`.
false par défaut.

`[[Configurable]]` : Si `false`, la propriété est non supprimable. false par défaut.

**Attribut des Propriétés d'accesseurs**

`[[Get]]` : la fonction est appellée sans argument afin de récupérer la valeyr de 
la propriété. `undefined` par défaut

`[[Set]]` : la fonction appellé avec un argument permet de modifier la valeur de la 
propriété. `undefined` par défaut.

`[[Enumerable]]` : ...

`[[Configurable]]` : ...

**Les objets "de base"**

Il existe un certains nombres d'objets de bases dans JS, ou **objets natifs**.
Par exemple, les arrays, les arrays typés, les maps, les sets ...

###Déterminés le type d'une valeur, d'une variable : `typeof`

l'opérateur unaire `typeof` renvoie le type primitife d'une variable/valeur/objet 
sous forme de string

```js
typeof "hello" // => "string"
typeof (new Boolean()) // => "object"
```

###Note sur les fonctions

Les fonctions sont des objets, mais peuvent par abus être considéré comme un type primitif.
Utiliser l'opérateur `typeof` sur une fonction ou une variable contenant une expression de fonction
renverra "function"

```js
function ajoute(x, y) {
  var total = x + y;
  return total;
}
```

`x` et `y` sont des arguments. `total` est une variable local à la fonction.
Note qu'il existe depuis ES6 le keyword `let` pour déclarer des variables locales
à un block (`{..}`).

* **Cas des fonctions avec un nombre d'arguments aléatoire** : `arguments`

L'objet `arguments` est très utile pour définir des fonctions avec une nombre 
d'arguments aléatoire.

C'est un objet relativement semblabla à un array, qui permet d'accèder aux arguments
d'une fonction : `arguments[n]` renverra la n-ième valeurs passés en argument.

`arguments` possède également la propriété `length`. Exemple :

```js
function sumAll() {
  let sum = 0;
  for (arg of arguments) {
    sum += arg;
  }
}
```

Une propriété de toute fonction, à vrai dire une méthode, peut être utile si l'on
souhaite passé un ensemble d'arguments sous formes d'array : `Function.prototype.apply()`

`func.apply(thisArg, [argsArray])`

`thisArg` est la valeur de this fournie pour l'appel de fonction. Peut être `null` ou 
`undefined` pour l'objet global en mode non-strict.

`argsArray` : l'array d'arguments à passer.

* **Les fonctions anonymes**

En JS, on peut également créer des fonctions anonymes. C'est très puissant si 
astucieusement utilisé :

```js
var a = 1;
var b = 2;
(function() {
  var b = 3;
  a += b;
})();
a; // 4
b; // 2
```

###Les objets personnalisés

Voici un exemple pour introduire la notion d'objets personnalisés :

```js
function Personne(prenom, nom) {
  this.prenom = prenom;
  this.nom = nom;
  this.nomComplet = function () {
    return this.prenom + ' ' + this.nom;
  }
  this.nomCompletInverse = function() {
    return this.nom + ' ' + this.prenom;
  }
}
var s = new Personne("Simon", "Willison");
```

Remarquons le keyword `new` : Il est très lié à `this`. Il crée un nouvel objet 
vide et appelle ensuite la fonction spécifiée, avec `this``pointant vers ce nouvel
objet. On appelle les fonctions prévues pour être appelées par `new` des **constructeurs**.
L'usage est de mettre la première lettre de la fonction en majuscule.

Ceci dit, notre constructeur n'est pas **efficace** : A chaque création d'un objet via 
ce dernier, on recréer inutilement les fonctions `nomComplet` et `nomCompletInvers`.
Il est plus efficace d'utiliser le **prototype**.

```js
function Personne(prenom, nom) {
  this.prenom = prenom;
  this.nom = nom;
}

Personne.prototype.nomComplet = function nomComplet () {
  return this.prenom + ' ' + this.nom;
}
Personne.prototype.nomCompletInverse = function nomCompletInverse () {
  return this.nom + ' ' + this.prenom;
}
```

Il s'en dégage une notion **F O N D A M E N T A L E** : le **prototype**.
On la verra plus en détails plus bas. 

###Les Closures

Voici un exemple simpliste mais très illustrant :

```js
function creerAdditionneur(a) {
  return function(b) {
    return a + b;
  }
}

var x = creerAdditionneur(5);
var y = creerAdditionneur(20
x(6) // renvoie 11
y(7) // renvoie 27
```

Expliquons schématiquement le processus : à l'éxecution d'une fonction, un objet 
de portée est crée pour conserver les variables locales créées au sein de cette
fonction. Il est initialisé au même moment que les variables passées en paramètres.
On ne peut pas accéder directement à ces objets de portés. 
Normalement, le ramasse-miettes de JS devrait supprimer l'objet de portée à la fin de 
l'appel de la fonction. Mais la fonction renvoyée gardant une référence vers cet objet, 
le ramasse-miette ne peut pas supprimer l'objet, et donc les variables locales sont
toujours accessibles par l'intermédaire de la fonction interne.

Ce qu'on appelle **closure** est la combinaison d'une fonction et de l'objet de 
portée dans lequel elle a été créee.

Permettant ainsi l'enregistrement d'état, elles peuvent facilement remplacer les 
objets.


##Les tests d'égaliés

On va se focaliser ici sur trois opérations permettant de comparer des valeurs 

* l'égalité strice `===`

* l'égalite faible `==`

* `Object.is()`, arrivée avec ES6

### Egalité strice `===`

L'égalite stricte compare deux valeurs et teste leur égalité. Aucune des deux valeurs
n'est convertie implicitement en une autre valeur. Si les deux valeurs sont typés 
différemment, elles sont considérés comme différentes.

```js
var num = 0;
var obj = new String("0");
var str = "0";
var b = false;

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num === obj); // false
console.log(num === str); // false
console.log(obj === str); // false
console.log(null === undefined); // false
console.log(obj === null); // false
console.log(obj === undefined); // false
```

Il existe également le test de non égalité stricte : `!==`

C'est très souvent le meilleurs des opérateurs à utilisés pour un test d'égalité.

###L'égalité faible avec `==`

Le test d'égalité faible compare deux valeurs après les avoir converties
en valeur d'un même type.

Par exemple :

```js
0 == "0" // true
false == 0 // true
```

Généralement, il n'est pas optimisé d'utiliser ce test, sauf si l'on sait exactement
pourquoi.

###`Object.is()`

On utilise la méthode comme ceco : `Object.is(0, "0") //false`

Sa force est de pouvoir traiter les valeurs très proches de zéro, 0+ et 0-. Ormis
ces cas, il est conseillé d'utiliser `===`


##Héritage et chaîne de prototypes

On va détailler ici le prototype d'un objet et expliquer ce qu'est la **chaine de prototype**,
indispensable pour parler

JS est un language de prototype, et non de classe, bien que ES6 est implémenté 
du sucre syntaxique pour simuler les classes.

Chaque objet **possède un lien interne vers un autre objet, appelé prototype**.
Cet objet prototype possède lui aussi un prototype, et ainsi de suite. Et cela
jusqu'au prototype `null` qui n'a pas de prototype. Cela représente 
**la chaine de prototypes**.

Un prototype est donc un objet de référence pour un objet.

###Héritage des propriétés

On le repète, un prototype est un objet de référence pour un objet. Mais que cela
signifie ?

Un objet possède des propriétés propres. Ceux sont des propriétés qu'il possède
explicitement. Elles lui sont attribués à la constructions ou plus tard dans le programme.
Mais un objet possède aussi des propriétés héritées, qu'il possède de façon implicite.
Ces propriétés héritées sont "transmises" par le prototype.

Exemple : 

```js
var a = {a: 1, b: 2};
var b = {c: 3, d: 4};
b.prototype = a;

b.a // 1, b à hérité de la propriété a de l'objet a.
```

Point important à préciser, quand un objet hérite d'une méthode (une propriété ayant pour
valeur une fonction), `this` fait référence à l'objet hérité.

**A retenir :** Quand on souhaite accèder à une propriété d'un objet, JS parcours les propriétés
propres de l'objet. Si elle n'est pas présente, JS cherchera dans l'objet prototype, 
puis dans le prototype du prototype, et cela jusqu'au protype null.

###Différentes façons de créer des objets et leurs chaînes de prototypes

* **Litérallement** 

```js
var o = {a: 1};

// L'objet o qui vient d'être créé hérite de Object.prototype.
// o ne possède pas de propriété 'hasOwnProperty'
// hasOwnProperty est une propriété de Object.prototype.
// Donc o hérite de hasOwnProperty grâce à Object.prototype
// Object.prototype a null comme prototype.
// Voici la chaîne de prototypes : 
// o ---> Object.prototype ---> null

var a = ["yo", "bien", "?"];

// Les tableaux (Array) héritent du prototype Array.prototype
// (possédant les méthodes indexOf, forEach, etc.).
// La chaîne de prototypes est la suivante :
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// Les fonctions héritent du prototype Function.prototype (avec les méthodes call, bind, etc.):
// f ---> Function.prototype ---> Object.prototype ---> null
```

* **Avec un constructeur**

On rappel qu'un constructeur est une fonction qui retourne un objet et que l'on
appele avec l'opérateur `new`

```js
function Graph() {
  this.sommets = [];
  this.aretes  = [];
}

Graph.prototype = {
  ajouteSommet: ( (v) => this.sommets.push(v) );
}
 
var g = new Graph();
//g est un objet avec les propriétés propres sommets et aretes.
//Il hérite du prototype Graph.prototype, et donc de la méthode ajouteSommet().
```

Un point important pour la performance** : Regardons comment nous avons définis la méthode
dans le prototype et non pas dans le constructeur. Cela permet d'éviter de créer une même 
fonction pour chaque objet créer avec le constructeur. Il est grandement préférable de 
placer les méthodes génériques à des objets dans le prototype.
C'est d'ailleurs par ce procédés que nos objets arrays par exemples (`[1,2,3]`) 
héritent des méthodes de l'objet Array.

* **Avec `Object.create()`**

Cette méthode de l'objet global Object permet de créer un nouvel objet dont le 
prototype sera celui de l'objet en argument.

```js
var a = {a: 1};
var b = Object.create(a);
//b.a retourne 1, b hérite de la propriété a via son prototype
//mais ce n'est pas une propiété propre.
```

* **ES6: le keyword `class`**

ES6 a apporté du sucre syntaxique pour implémenter des classes :
`class`, `constructor`, `static`, `extends`, `super`.

```js
class Polygone {
  constructor(hauteur, largeur) {
    this.hauteur = hauter;
    this.largeur = largeur;
  }
}

class Carre extends Polygone {
  constructor(cote) {
    super(cote, cote);
  }
  get aire() {
    return this.hauter * this.largeur;
  }
  set longueurCote(nouvelleLongueur) {
    this.hauteur = nouvelleLongueur;
    this.largeur = nouvelleLongueur;
  }
}
var carre = new Carre(2);
}
```

###Performances

Une très longue chaine de prototype peut emmener à de longue recherche de 
propriété. Ainsi, si l'on recherche une propriété propre à un objet, on utilisera
toujours la méthode qu'hérite tout les objets : `hasOwnProperty()`.

***

##Closure

Voyons le code suivant :

```js
function makeFunction() {
  var nom = "Mozilla";
  function afficheNom() {
    alert(nom);
  }
  return afficheNom;
};

var maFonction = créerFonction();
maFonction();
```

Nous sommes dans le cas typique d'une closure : Une association entre une fonction
et l'environnement dans lequel elle a été créer.
Comme expliquer plus haut un objet de portée est créer lors de l'appel
de la fonction `makeFunction()`. Cette objet devrait être supprimé par le ramasse
miette de JS à la fin de l'éxécution de la fonction. Cependant, on a retourné
une fonction `âfficheNom()` qui à accès à cette objet d'appel stockant les variables
internes et les arguments, il existe donc encore un lien entre un objet actif (la 
fonction retourné) et l'objet d'appel : Le ramasse-miette ne peut vider la mémoire,
et donc la fonction retourner peut accéder à cette mémoire : C'est pourquoi que l'on 
dit que la fonction se "souvient" de son environnement d'appel.

###Emuler des méthodes privées avec les closures

L'une des grande force des closures est de pouvoir émuler des méthodes privées,
ce que ne permet pas JS de façon native. Au-delà, cela permet de gérer un espace
de nom global qui isole les méthodes secondaires de l'interface publique du code, ainsi
rendus plus propre

```js
var compteur = ( function() {
  var compteurPrive = 0;
  function changeValeur(val) {
    compteurPrive += val;
  }
  return {
    increment: function() {
      changeValeur(1);
    },
    decrement: function() {
      changeValeur(-1);
    },
    valeur: function() {
      return compteurPrivé;
    }
  }
}
console.log(compteur.valeur()); /* Affiche 0 */
compteur.incrément();
compteur.incrément();
console.log(compteur.valeur()); /* Affiche 2 */
compteur.décrément();
console.log(compteur.valeur()); /* Affiche 1 */
```

***

