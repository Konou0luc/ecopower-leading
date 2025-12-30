# Guide de Déploiement - Ecopower Landing

## 🚀 Options de Déploiement

### Option 1 : Vercel (Recommandé pour Next.js) ⭐

**Avantages :**
- Gratuit pour les projets personnels
- Optimisé pour Next.js
- Déploiement automatique depuis GitHub
- SSL automatique
- Configuration du domaine personnalisé simple

**Étapes :**

1. **Préparer le projet pour la production :**
   ```bash
   # Vérifier que le build fonctionne
   npm run build
   ```

2. **Créer un compte Vercel :**
   - Aller sur https://vercel.com
   - Se connecter avec GitHub

3. **Déployer le projet :**
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquer sur "Deploy"

4. **Configurer le domaine personnalisé :**
   - Dans le dashboard Vercel, aller dans "Settings" > "Domains"
   - Ajouter votre nom de domaine
   - Suivre les instructions pour configurer les DNS

5. **Variables d'environnement :**
   - Dans "Settings" > "Environment Variables"
   - Ajouter `NEXT_PUBLIC_API_URL=https://ecopower-api.vercel.app`

---

### Option 2 : Netlify

**Étapes similaires à Vercel :**
1. Créer un compte sur https://netlify.com
2. Connecter votre repository GitHub
3. Configurer le build : `npm run build`
4. Dossier de sortie : `.next`
5. Ajouter votre domaine dans "Domain settings"

---

### Option 3 : Hébergement Traditionnel (LWS ou autre)

**Étapes :**

1. **Build du projet en production :**
   ```bash
   npm run build
   ```

2. **Créer un fichier de configuration pour l'hébergement :**
   - Vous devrez configurer Node.js sur votre serveur
   - Installer les dépendances : `npm install --production`
   - Démarrer le serveur : `npm start`

3. **Configuration du serveur :**
   - Utiliser un process manager comme PM2
   - Configurer un reverse proxy (Nginx) pour votre domaine
   - Configurer SSL avec Let's Encrypt

---

## 📋 Checklist avant le déploiement

- [ ] Vérifier que `npm run build` fonctionne sans erreur
- [ ] Tester toutes les pages du site
- [ ] Vérifier que les images sont bien chargées
- [ ] Tester les liens externes (Google Play, partenaires)
- [ ] Vérifier la responsivité mobile
- [ ] Configurer les variables d'environnement
- [ ] Vérifier que le bouton "N" de Next.js est bien désactivé

---

## 🔧 Configuration DNS

Une fois votre site déployé, vous devrez configurer les DNS de votre domaine :

**Pour Vercel/Netlify :**
- Type A : Point vers l'IP fournie
- Type CNAME : Point vers le domaine fourni (ex: `your-site.vercel.app`)

**Pour un hébergement traditionnel :**
- Type A : Point vers l'IP de votre serveur
- Type CNAME (www) : Point vers votre domaine principal

---

## 📝 Notes importantes

1. **Variables d'environnement :** Assurez-vous que `NEXT_PUBLIC_API_URL` est bien configuré dans votre plateforme de déploiement
2. **SSL :** Vercel et Netlify fournissent SSL automatiquement. Pour un hébergement traditionnel, utilisez Let's Encrypt
3. **Performance :** Vercel optimise automatiquement Next.js pour de meilleures performances

---

## 🆘 En cas de problème

- Vérifier les logs de build dans votre plateforme
- Vérifier que toutes les dépendances sont installées
- Vérifier la configuration DNS (peut prendre jusqu'à 48h pour se propager)

