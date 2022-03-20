# Execution via docker
 ### Prérequis
 - Avoir docker
- Télécharger le fichier docker-compose.yaml
- Lancer docker

 Ligne de commande
 ```bash
 docker volume create web_data_test_crud
 docker-compose up
```

>***Port extérieur utilisé***
>>**mysql**: 9052
**phpmyadmin**: 9053 (login: root, password: user)
**Application** : 9050


# Information du dev
*Le serveur est lancé sur le port **8080***

### Librairies
- Framework: express
- Langage: Typescript
- Daemon: pm2
- ORM: Sequelize
  

### Commande dev
 ```bash
- npm build #compilation des sources ts
- npm run dev #env de test
- npm run test #lancement des test
 ```
# Route

- POST /bookmark/add

@params
```json
#type vimeo
{ "url": "https://vimeo.com/565486457" }
# ou type flirk
{ "url": "http://www.flickr.com/photos/bees/2341623661/" }
```

Réponse pour un type  vidéo

```json
{
	"id": 1,
	"title": "Sylvain Lhommée @ Nation Entreprenante - Episode #5",
	"url": "https://vimeo.com/565486457",
	"author": "BARTERLINK",
	"datePublish": "2021-06-21T00:42:24.000Z",
	"thumbnail": "https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166",
	"video": {
		"id": 1,
		"width": 426,
		"height": 240,
		"duree": 1070,
		"bookMarkId": 1
	},
	"updatedAt": "2022-03-19T18:53:37.830Z",
	"createdAt": "2022-03-19T18:53:37.830Z"
}
```

Réponse pour un type  photo
```json
{
	"id": 7,
	"title": "ZB8T0193",
	"url": "http://www.flickr.com/photos/bees/2341623661/",
	"author": "seeb",
	"datePublish": "2022-03-19T19:13:41.273Z",
	"thumbnail": "https://live.staticflickr.com/3123/2341623661_7c99f48bbf_q.jpg",
	"photo": {
		"id": 4,
		"width": 1024,
		"height": 683,
		"bookMarkId": 7
	},
	"updatedAt": "2022-03-19T19:13:41.273Z",
	"createdAt": "2022-03-19T19:13:41.273Z"
}
```

- GET /bookmark/read/:id

Réponse pour un type  photo
```json
{
	"id": 2,
	"url": "http://www.flickr.com/photos/bees/2341623661/",
	"title": "ZB8T0193",
	"author": "seeb",
	"datePublish": "2022-03-19T19:06:07.000Z",
	"thumbnail": "https://live.staticflickr.com/3123/2341623661_7c99f48bbf_q.jpg",
	"createdAt": "2022-03-19T19:06:07.000Z",
	"updatedAt": "2022-03-19T19:06:07.000Z",
	"video": null,
	"photo": {
		"width": 1024,
		"height": 683
	}
}
```

Réponse pour un type  vidéo
```json
{
	"id": 9,
	"url": "https://vimeo.com/565486457",
	"title": "Sylvain Lhommée @ Nation Entreprenante - Episode #5",
	"author": "BARTERLINK",
	"datePublish": "2021-06-21T00:42:24.000Z",
	"thumbnail": "https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166",
	"createdAt": "2022-03-19T19:16:53.000Z",
	"updatedAt": "2022-03-19T19:16:53.000Z",
	"video": {
		"width": 426,
		"height": 240,
		"duree": 1070
	},
	"photo": null
}
```
  
 - GET /bookmark/
 Récupère la liste des bookmarks 
 ```json
	[{},{}, "..."]
 ```

- PUT /bookmark/edit/:id

@Params attendu (on met toutes les propriétés qu'on veut mettre à jour)
```json
{	
	"title": "update title",
	"author": "..."
	"video": {
		"width": 200,
		"...."
	},
	"..."
}
```

Retour 
```json
{ "save": true }
```

- DELETE /bookmark/delete/:id
```json
{ "save": true }
```
