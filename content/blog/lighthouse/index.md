---
title: Lighthouse = pas bien, mais en fait si
date: "2020-12-11T22:12:03.284Z"
thumbnail: "./thumbnail.jpg"
tags: ['Testing']
description: "À l'école on nous disait que Wikipedia c'était pas une source fiable. Aujourd'hui certains disent ça de Lighthouse. Mais alors qu'en est-il?"
---

J'avais rapidement mentionné l'article [Building the most inaccessible site possible with a perfect Lighthouse score](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/) dans mon premier article. J'aimerais en parler un peu plus, car je trouve cet article intéressant.

## L'article

Pour résumer, l'article démontre qu'on peut faire un site complètement inutilisable et obtenir un score de 100 partout sur Lighthouse (ou autre outil de testing).

## Ma critique

La démonstration que fait l'auteur est assez marrante à lire. Et en effet, on peut effectivement obtenir un score parfait avec un site complètement inutilisable. Cependant, je trouve que les moyens utilisés pour rendre le site inutilisable sont plutôt absurdes. 

Par exemple, le premier moyen utilisé est d'ajouter l'attribut [hidden](https://developer.mozilla.org/fr/docs/Web/HTML/Attributs_universels/hidden) à la balise `body`, puis de réafficher le body en CSS avec un `display: block;`. Du coup, le site ne s'affiche que si le CSS est bien chargé. Personnellement, je ne vois pas qui aurait l'idée de faire une telle spécialité dans son code. (alors en réalité si, il y aurait le cas de figure où on voudrait éviter le [FOUC](https://fr.wikipedia.org/wiki/FOUC), mais il y a de meilleures manières de faire, et lorsqu'on le fait, on est normalement conscient de ce que ça implique). 

Du coup je vais prendre un deuxième et meilleur exemple. Dans l'article, l'auteur utilise le code suivant

```css
@media screen and (-ms-high-contrast: active) {
  * {
    color: window !important;
  }
}
```

Ce code fait en sorte que lorsqu'on active le mode "high contrast", le texte soit de la même couleur que le fond. Alors ok, Lighthouse ne le détecte pas. Mais honnêtement, qui va faire ça sans faire exprès?

La plupart des exemples de l'article sont aussi absurdes que celui-ci. Désactiver les entrées du clavier, désactiver les entrées de la souris, mettre 1% d'opacité aux textes... alors en effets, on peut "tromper" Lighthouse ainsi, mais il faut vraiment le vouloir. Malgré ça j'aime quand même bien cet article, mais je pense qu'il aurait pu être plus convainquant en présentant des exemples plus concrets. Car en finissant de lire cet article, je me suis dit que si l'auteur avait dû aller chercher si loin, c'est que Lighthouse était finalement vraiment pas si mal.

## Conclusion

L'article démontre au final que Lighthouse est un très bon outil. Mais en effet, on peut avoir fait certaines choses très spécifiques qui passeraient entre les mailles des tests. Donc utilisez plusieurs outils de testing, et n'oubliez pas qu'un des meilleurs tests reste [le test concret](https://golb.ch/screenreaders/).