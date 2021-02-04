---
title: i18n et l10n
date: "2020-12-01T22:12:03.284Z"
tags: ['Accessibilité']
thumbnail: "./thumbnail.jpg"
description: "Dans cet article on s'intéresse à deux grands sous-domaines de l'accessibilité, j'ai nommé i18n et l10n."
---

Dans l'accessibilité on aime bien les [numéronymes](https://fr.wikipedia.org/wiki/Num%C3%A9ronyme). Aujourd'hui on va parler d'Internationalization et de Localization. Et je comprends en écrivant ces lignes pourquoi on abrège i18n et l10n, c'est super compliqué à orthographier. Je suis tombé récemment sur l'article "[Internationalization And Localization For Static Sites](https://www.smashingmagazine.com/2020/11/internationalization-localization-static-sites/)" qui explique en gros la réflexion et la démarche à avoir lorsqu'on aimerait développer un site multilingue. Ce sujet est plutôt intéressant car aucune solution donnée n'existe. L'article nous rappelle que l'internationalisation ne consiste pas juste à traduire du texte. Et à ce niveau-là, l'article peut presque faire peur car on se rend compte que rendre un site international demande un énorme investissement. Je vais revenir sur quelques points que je trouve intéressants. Ces points paraissent, pour la plupart, être des détails. Mais ils peuvent vite complexifier grandement le développement d'un site et méritent donc qu'on s'y intéresse.

## Les urls

Rien que les urls posent déjà pas mal de problèmes. Hormis le fait de choisir entre `site.com/fr`, `site.com?lang=fr` ou autre solution exotique, faut-il traduire nos urls? Par exemple, si on a une page en français dont l'url est `site.com/fr/accueil`, la version anglaise doit-elle être `site.com/en/accueil` ou `site.com/en/home `? Et bien il n'y a pas vraiment de réponse correcte. La première solution offre par exemple un moyen facile aux utilisateurs pour changer de langue, mais la deuxième permet à l'utilisateur de mieux se repérer sur le site. Je vous laisse vous faire votre propre avis sur la question.

## Les dates

C'est peu-être un des problèmes les plus évidents. Et il existe énormément de solutions techniques pour gérer ce problème. Malgré ça j'ai l'impression que ça reste un cauchemar pour tous les développeurs. Du coup je propose qu'on adopte tous le format yyyy/mm/dd qui est objectivement supérieur à tout autre format. Quoi que j'hésite avec yyyy-mm-dd... 🤔

## Le sens de lecture

C'est si évident et pourtant je n'y pense quasiment jamais. Mais si vous allez sur la version arabe de Facebook ([https://ar-ar.facebook.com/](https://ar-ar.facebook.com/)), et bien toute l'interface est mirorée (apparemment ce mot n'existe pas...). L'interface est horizontalement retournée, puisqu'on lit de droite à gauche en arabe. Alors je me suis dit que techniquement ça devait être l'enfer, surtout au niveau du css. Mais j'ai appris existence de [l'attribut dir](https://www.w3.org/International/questions/qa-html-dir), qui permet d'indiquer au navigateur le sens de lecture. Alors j'ai testé sur un site que j'ai développé et WOW! J'ai été très étonné du peu d'ajustements que j'ai eu à faire pour proposer une version miroir de mon site.

Il y a pléthores d'autres points intéressants à aborder. Proposer un site i18n n'est pas une mince affaire. Donc si vous êtes amené à en développer un, je ne peux que vous conseiller de relire l'article "[Internationalization And Localization For Static Sites](https://www.smashingmagazine.com/2020/11/internationalization-localization-static-sites/)" et de bien réfléchir à votre stratégie avant de commencer à coder. 

