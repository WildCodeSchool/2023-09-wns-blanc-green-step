# 2023-09-wns-blanc-green-step


// test front avec fichier de rapport 
 npx playwright test

// test front spécifique, je conseille d'utiliser cette ligne 
npx playwright test tests/addExpense.test.ts --headed

// test docker | un peu long ...
docker compose -f docker-compose.e2e.yml up --build --exit-code-from e2e

// test front pour ouvrir le dernier rapport dans le navigateur
npx playwright show-report

//pour se connecter au back docker pour lancer les tests
1 - docker ps
2 - choisir le containerID
3 - docker exec -it <containerID> sh

Installation de jest : npm install jest ts-jest @types/jest
