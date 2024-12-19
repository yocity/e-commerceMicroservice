## Application en Microservices

### Fonctionnalités
- Services indépendants pour la gestion des utilisateurs, produits, commandes et paiements.
- Communication inter-services via un bus d'événements.
- Authentification centralisée.

### Technologies Utilisées
- **Backend** : NestJS (architecture microservices)
- **Base de données** : MySQL (chaque service peut avoir sa propre base)
- **Authentification** : JWT

### Lancer le Projet
1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances pour chaque service :
   ```bash
   cd services/<nom-du-service>
   npm install
   ```
3. Configurez les variables d'environnement pour chaque service dans `config/.env`.
4. Lancez RabbitMQ pour la communication entre services.
5. Démarrez chaque service individuellement :
   ```bash
   npm run start
   ```
6. Accédez à l'API Gateway sur [http://localhost:3000](http://localhost:3000).

---

## Contributions
Les contributions sont les bienvenues ! Si vous avez des suggestions ou souhaitez signaler des problèmes, veuillez créer une **issue** ou soumettre une **pull request**.

## Licence
Ce projet est sous licence MIT. Consultez le fichier [LICENSE](./LICENSE) pour plus d'informations.
