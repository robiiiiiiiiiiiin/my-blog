---
title: Vous faites sûrement de la programmation fonctionnelle sans le savoir
date: "2021-06-01T12:00:00.284Z"
description: "Lors d'un entretien, on m'a demandé de parler de la programmation fonctionnelle. C'est donc, un peu trop tard, que je m'y intéresse, mais je découvre des concepts fabuleux."
tags: ['Javascript']
thumbnail: "./thumbnail.jpg"

---

Vous avez déjà utilisé la méthode `map()` ? Ou bien `filter()` ? Ou peut-être que vous utilisez React et que vous suivez les bonnes pratiques en utilisant toujours `setState()` pour modifier vos variables d'état? Et bien je vous annonce que vous avez fait un premier pas dans le monde de la programmation fonctionnelle.

La programmation fonctionnelle est un **paradigme de programmation**. Des [paradigmes de programmation](https://fr.wikipedia.org/wiki/Paradigme_(programmation)#Liste_de_paradigmes), il en existe pleins. Mais en JavaScript, on en utilise principalement trois.

1. La programmation procédurale
2. La programmation orientée objet
3. La programmation fonctionnelle

La **programmation procédurale**, c'est la programmation "normale" / "de base". C'est celle qu'on apprend à l'école lors de ses premiers cours de prog. C'est celle où on va programmer une suite d'opérations qui vont s'exécuter l'une après l'autre. C'est celle dans laquelle on va utiliser des boucles `for()` ou `while()` et des conditions if-else.

La **programmation orientée objet**, vous l'avez sûrement apprise lors de votre 2e ou 3e semestre si vous avez fait des études en IT ou en dev. Je ne vais pas l'expliquer ici, car ce n'est pas le but de l'article, et car je pense que la majorité des devs connaissent les principes de ce paradigme. En général, c'est une manière de programmer (car un paradigme, c'est un peu ça en fait) qu'on discerne assez facilement.

La **programmation fonctionnelle**, qu'est-ce que c'est que donc? C'est un paradigme de plus en plus populaire, qui a pour but, entre autres, de rendre le code plus **concis**, **prévisible**, et plus **facile à tester**. J'ajouterais également qu'il permet d'améliorer la réutilisabilité et la modularité du code. Pourquoi est-ce que je mets ces critères à part? Car les trois premiers proviennent de l'article [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) de [Eric Elliott](https://medium.com/@_ericelliott), auteur de plusieurs articles sur la programmation fonctionnelle, qui m'a bien aidé à comprendre ce paradigme.

Pour atteindre ces objectifs, il y a quelques principes fondamentaux à suivre.

- Utiliser des fonctions pures (**pure function**, en [VO](https://www.linternaute.fr/dictionnaire/fr/definition/vo/))
- Utiliser des données immuables (**immutable data**)
- Éviter les effets de bord (**side effects**)
- Programmer de manière déclarative (**declarative** programming)

Alors oui, pour expliquer le principe de programmation fonctionnelle, on est obligé d'expliquer 47 autres principes. Cependant, même si vous ne vous lancez pas dans la programmation fonctionnelle, ces principes sont présents dans beaucoup d'autres aspects de JavaScript. Donc, dans tous les cas, c'est intéressant de les connaitre.

### Pure function

Une fonction pure est une fonction qui, 

1. lorsqu'on lui donne les mêmes valeurs d'entrée, nous retournera toujours la même valeur de sortie.
2. N'a pas de side effect

### Side effect

Un side effect se produit lorsqu'une fonction modifie un état ne faisant pas partie du scope local de cette fonction.

Exemple:

```javascript
let result

const incrementBy= (a, b) => {
	result = a + b // side effect! On modifie c, qui est une variable externe à la fonction actuelle
}

// version sans side effect
const functionalIncrementBy= (a, b) => {
	let res = a + b
    return res
    // Ou bien juste: return a + b
}
```

À noter qu'un `console.log()` ou un rendu graphique sont également considérés comme des side effect, puisque ça agit sur des objets externes à la fonction. Cependant, sans rendu graphique, beaucoup d'applications JavaScript ne serviraient plus à grand-chose. Donc, la plupart du temps, on va surtout appliquer ce principe aux variables. Cependant, on remarquera quand même que ce n'est pas pour rien que React encourage à externaliser la gestion du rendu 😉

### Immutable data

Ce principe définit simplement que lorsqu'une variable est initialisée, celle-ci ne doit jamais être modifiée. Ce principe est en réalité difficile à suivre au pied de la lettre en JavaScript, car le langage n'a pas été prévu pour l'immuabilité. On pourrait croire que déclarer une variable avec `const` la rend immuable, pourtant les propriétés d'un objet déclaré avec `const` peuvent malgré tout être modifiées.

```javascript
const book = {title: "Batman", pageCount: 30}

book = {title: "Superman", pageCount: 45} // Erreur! normal, book est une constante

book.price = 19.90 // ça marche! book n'est donc pas immuable
```

On voit donc que JavaScript n'a pas été créé pour la programmation fonctionnelle. Il existe cependant des librairies rendant JavaScript immuable.

### Declarative programming

Pour expliquer le principe de programmation déclarative, il est plus simple d'expliquer son principal concurrent qu'est la **programmation impérative**. À noter que la POO et la programmation procédurale sont des paradigmes impératifs, ce qui les distinguent bien de la programmation fonctionnelle.

La programmation impérative est une manière très étape par étape de fonctionner. On va, par exemple, utiliser des boucles dans lesquels on pourra facilement voir ce qu'il se passe à chaque itération.

```javascript
const incrementArray = array => {
    const incremented = []
	for(let i = 0; i < array.length; i++ ){
        incremented.push(array[i] + 1)
    }
    return incremented
}
```

La programmation déclarative est une manière plus descriptive de programmer, où l'on va plus se focaliser sur le "quoi" que sur le "comment". Pour remédier à ces boucles assez lourdes syntaxiquement, la programmation fonctionnelle va plutôt utiliser des fonctions comme `map()`, `filter()` ou `reduce()`. 

```javascript
const incrementArray = array => array.map(n => n + 1)
```

On voit clairement que ça rend le code plus concis!

## Conclusion

Alors, on oublie tout et on passe au paradigme fonctionnel? C'est un peu tôt pour ce faire une vraie idée sur ce paradigme. Le sujet est extrêmement vaste. Ce que je peux dire sans trop me mouiller, c'est que JavaScript n'est, de base, pas super adapté pour faire de la vraie de vraie programmation fonctionnelle. Cependant, certains principes sont très bons à adopter dans de nombreux cas. Je pense notamment aux side effects et aux données immuables.

D'ailleurs, React est fortement basé sur ces principes. À ce propos, je vous recommande très fortement de lire l'article [The Missing Introduction to React](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) de mon nouvel ami Eric Eliott, et surtout de regarder la vidéo en début d'article. Ça a été pour moi un début de révélation.

Je vous conseille également l'article [Programmation fonctionnelle en JavaScript](https://buzut.net/programmation-fonctionnelle-en-javascript/) de Quentin Busuttil, qui explique (en français!) plus en profondeur ce paradigme, et qui aborde surtout plus de concepts de la programmation fonctionnelle.

