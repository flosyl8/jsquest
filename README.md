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

* string : `"hello", "\nwordl", "red"`

Permet de représenter des données textuelles. Dans un niveau low-level, les strings
sont des ensembles d'éléments de valeurs entières non-signés codés sur 16 bits. Chaque 
élément occupe une position au sein de cette chaîne, en commençant par **0**.

Une chaine string est impossible à modifier, car c'est une valeur primitive. 

* symbol 

Arrivée avec ES6. On peut faire un parallèle entre les symboles et les enum de C.

* objet

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

**Cas des fonctions avec un nombre d'arguments aléatoire : `arguments`**

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

**Les fonctions anonymes**

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

