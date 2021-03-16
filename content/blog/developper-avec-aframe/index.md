---
title: Développer un jeu en réalité virtuelle sur le web
date: "2021-03-16T12:00:00.284Z"
description: "Ça me paraissait presque impossible, et c'est pourtant si facile à l'aide du framework A-Frame."
tags: ['Framework']
thumbnail: "./thumbnail.jpg"

---

En fin février, j'ai suivi un cours de deux semaines sur le développement en réalité virtuelle (j'adore mes études). Alors évidemment en 2 semaines on ne devient ni game designer, ni expert en VR, ni pas grand-chose. Cependant, j'ai été bluffé par ce que l'on peut réaliser en si peu de temps grâce au framework [A-Frame](https://aframe.io/). J'ai eu essayé de développer des jeux avec Unity, mais la motivation s'est envolée après les dix premières heures de tuto en voyant les 90 restantes. Il m'est également arrivé de développer des micro-jeux en utilisant JavaScript et les [canvas](https://developer.mozilla.org/fr/docs/Web/HTML/Element/canvas) html, mais le résultat était... peu impressionnant. Alors quand on m'a dit que j'avais moins de 2 semaines pour apprendre un framework et développer une expérience VR, j'avais peu d'espoir de faire quelque chose de grandiose et de fonctionnel. Et finalement... ba j'ai pas codé GTA, mais je suis plutôt content du résultat.

## Le framework A-Frame

Je ne vais pas vous faire un tuto A-Frame, mais j'aimerais essayer de vous faire comprendre en (très) gros son fonctionnement. Comment est-ce qu'on peut coder une expérience VR avec du bête HTML et du simple JavaScript?

En fait, le framework est tellement simple d'utilisation qu'il vous suffit de créer un fichier HTML avec le code suivant, de double cliquer dessus, et pouf vous aurez créé votre première expérience VR. ( Allez-y, j'attends... )

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-sky color="#ECECEC"></a-sky>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
    </a-scene>
  </body>
</html>
```

Comme vous pouvez le voir, il suffit d'importer le framework dans votre HTML (bien sûr, on peut aussi le faire avec npm), de placez une `<a-scene>`, et de mettre dans cette scène tous les éléments que vous voulez dans votre expérience VR.

### Les composants A-Frame

Le framework est basé sur un système de composants JavaScript. Mais attention, si vous avez l'habitude des frameworks du style React, Angular ou Vue, sachez que les composants A-Frame ne s'utilisent pas exactement de la même façon. Là où un composant React "Foo" s'utilisera avec une balise `<Foo bar="value" />`, un composant A-Frame "Foo" s'utilisera en tant qu'attribut sur une balise représentant une entité `<a-entity foo="bar: value"></a-entity>`. Les balise `<a-entity>` servent à représenter n'importe quel élément de votre scène, que ce soit un mur, un ennemi, le joueur lui-même ou une lumière. Le concept est donc d'utiliser plein d'entités, au départ vides, et de leur attribuer différentes caractéristiques ou comportements en utilisant des composants.

A-Frame fournit un certain nombre de composants de base, et vous pouvez bien sûr créer vos propres composants. Les composants de base sont, par exemple, `position`, `rotation`, `material` ou `geometry`. Ils servent principalement à placer l'entité dans l'espace, à lui donner une forme, une couleur ou encore une animation. Vous pourrez ensuite coder vos propres composants qui serviront plutôt à apporter des comportements à vos entités. Par exemple, le premier composant que j'ai créé a été un composant `follow`. Grâce à ce composant, je peux dire à n'importe quelle entité de se déplacer en direction d'une autre. Ça peut être utile pour faire un ennemi qui vous fonce dessus, un missile à tête chercheuse ou un animal de compagnie. Dans l'exemple qui suit, la boule rouge va avancer en direction de la bleue. (à condition d'avoir codé le composant "follow" bien entendu)

```html
<a-entity
    id="redBall"
	position="0 0 0"
    geometry="primitive: sphere; radius: 2"
    material="color: red"
    follow="target: #blueBall">
</a-entity>
<a-entity
    id="blueBall"
	position="0 0 99"
    geometry="primitive: sphere; radius: 2"
    material="color: blue">
</a-entity>
```

Je ne vais pas vous montrer ici comment coder un composant, mais si ça vous intéresse, vous pouvez consulter la [documentation officielle sur les composants](https://aframe.io/docs/1.2.0/core/component.html).

### Gérer les contrôleurs et la compatibilité VR / PC 

Faire en sorte que mon jeu soit compatible PC et VR est ce qui m'a donné le plus de fil à retordre. Il serait honnêtement plus simple de faire une version différente par plateforme, mais ce serait plus compliqué à distribuer. Mais avant tout, laissez-moi déjà vous montrer comment gérer les contrôleurs VR, et par la même occasion, comment gérer le joueur.

Le joueur est en fait simplement composé d'une caméra, et de deux mains en VR. Pour la caméra, on va utiliser le composant A-Frame `camera`, et pour les mains, on va simplement utiliser le composant A-Frame `hand-controls`. Ensuite on va encapsuler ces deux éléments dans une entité avec le composant `movement-controls` qui va gérer les déplacements avec wasd ou un joystick. Trop simple non? 

```html
<a-entity id="player" movement-controls>
  <a-entity id="camera" camera position="0 1.7 0">
    <a-entity class="gun" gltf-model="#gun" position="0.5 -1 -1.2"></a-entity>
  </a-entity>

  <a-entity id="hands">
    <a-entity
      id="left-hand"
      position="-0.3 0 -0.3"
      rotation="0 0 90"
      hand-controls="hand: left">
    </a-entity>
    <a-entity
      id="right-hand"
      position="0.5 1.0 -1.5"
      rotation="0 0 -90"
      hand-controls="hand: right">
      <a-entity class="gun" gltf-model="#gun" position=" 0 -0.3 0"></a-entity>
    </a-entity>
  </a-entity>
</a-entity>
```

(Note: le composant gltf-model permet d'utiliser un asset 3d)

Comme vous pouvez le constater, mon joueur dispose d'un "gun". Et même de deux guns... En réalité, le premier, qui est dans la caméra, est le gun pour PC, et le deuxième, qui est dans la main droite, est le gun pour la VR. Il faudra donc détecter la plateforme sur laquelle nous sommes, et supprimer l'un des deux guns en fonction. Une tâche plutôt simple en apparence, mais qui en pratique amène vite des bugs si nos guns possèdent des composants (de tir par exemple).

Ensuite, il ne reste plus qu'à gérer les inputs du joueur.... "plus qu'à" .....

En réalité, A-Frame fournit un composant différent pour gérer chaque modèle de contrôleur (Oculus Quest, Oculus Go, HTC Vive, ...). A-Frame fournit également le composant `hand-controls` qui est un composant "universel". Mais chaque modèle de contrôleur possède des événements différents puisqu'ils ne possèdent pas les mêmes boutons. Et je vous avoue que je n'ai pas eu le temps de me pencher sur ça donc j'ai utilisé l'événement `mousedown` pour tout... et ça marche plus ou moins. J'ai eu certains échos comme quoi sur HTC Vive seul la gâchette gauche marcherait. Mais heu voilà, la deadline est passée et je n'ai plus de matériel VR pour tester donc mon projet restera un peu buggé 😅

### Les événements

Le dernier gros point, que je ne vais que peu aborder, est la gestion des événements. Sans ça notre gameplay risque d'être assez limité. On peut très bien gérer les événements de manière classique avec des `.emit()` et des `.addEventListener()` et c'est d'ailleurs ce que j'ai souvent fait. Sinon on peut utiliser des moyens un peu rigolo comme avec la librairie [aframe-event-set-component](https://github.com/supermedium/superframe/tree/master/components/event-set). Et mon prof a créé un petit composant `listen-to` qui couplé à `event-set` permet presque de gérer tous les événements sans écrire de JavaScript. En pratique ça donne un truc du genre:

```html
<a-entity id="elevator" position="0 0 0"
        listen-to="target: #elevator-btn; event: click; emit: elevator-up"
        event-set="_event: elevator-up; position: 0 10 0">
</a-entity>
<a-entity id="elevator-btn"></a-entity>
```

Dans cet exemple, l'ascenseur va se téléporter à 10m de hauteur lorsque vous allez cliquer sur le bouton. Alors en réalité vous mettriez plutôt une animation pour éviter qu'il ne se téléporte, mais c'est  pour vous montrer que les composants peuvent vraiment être "détournés" pour faire toute sorte de choses.

### Les librairies

Si vous fouillez un peu, vous trouverez pas mal de composants bien utiles que de gentils développeurs auront créés et mis à disposition. Voici une petite liste de ceux que j'ai utilisés ou qui pourraient vous être utiles.

- [A-Frame Extras](https://github.com/n5ro/aframe-extras), des add-ons incontournables comme movement-controls ou nav-mesh
- [aframe-physics-system](https://github.com/n5ro/aframe-physics-system), un moteur physique de base
- [aframe-teleport-controls](https://github.com/fernandojsg/aframe-teleport-controls), un composant de téléportation comme dans plein de jeux en VR
- [aframe-super-shooter-kit](https://github.com/supermedium/aframe-super-shooter-kit), propose des mécanismes basiques de fps
- [aframe-look-at-component](https://github.com/supermedium/superframe/tree/master/components/look-at/), pour qu'un élément soit constamment orienté vers le joueur
- [aframe-inspector-plugin-recast](https://github.com/donmccurdy/aframe-inspector-plugin-recast), pour créer facilement une nav-mesh (mur invisible)
- [aframe-state-component](https://github.com/supermedium/superframe/tree/master/components/state), pour centraliser la gestion d'état (je ne l'ai pas utilisé mais ça a l'air cool)

Sinon, sachez que A-Frame est basé sur [three.js](https://threejs.org/) et que vous pouvez utiliser directement les fonctions de three.js si la surcouche A-Frame ne vous suffit pas. Plus d'infos dans [la doc](https://aframe.io/docs/1.2.0/introduction/developing-with-threejs.html).

## Mon jeu

BON ET MON JEU ALORS?!?!? Je vous bassine avec depuis le début et je ne vous l'ai toujours pas montré. Et bien vous pouvez y jouer sur https://duckhuntrevenge.surge.sh. Comme je l'ai expliqué, les contrôles risquent d'être un peu spéciaux (pour ne pas dire buggés) suivant votre matériel VR. Ensuite, il est fortement conseillé d'utiliser Chrome ou Edge pour y jouer sur PC. Et pour finir, mon meilleur score est de 157 points, alors hésite pas à lâcher le tien dans les comms! (oui j'aurais pu faire un scoreboard. Mais bon heu... voilà, hein, okay?)

Pour les curieux, vous pouvez retrouver le code de mon jeu sur [ce repo](https://github.com/robiiiiiiiiiiiin/duck-hunt-revenge).