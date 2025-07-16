import { Step } from 'react-joyride';

export const dashboardSteps: Step[] = [
  {
    target: '[data-section="pending-tasks"]',
    content:
      "Cette section affiche les tâches en attente de publication. En tant qu'administrateur, vous pouvez approuver ou rejeter ces tâches avant qu'elles ne soient visibles par les utilisateurs.",
    title: 'Tâches en attente',
    disableBeacon: true,
  },
  {
    target: '[data-section="tasks-to-start"]',
    content:
      'Ici vous trouverez les tâches pour lesquelles votre candidature a été acceptée et que vous pouvez maintenant démarrer. Cliquez sur "Démarrer" pour commencer le travail.',
    title: 'Tâches à démarrer',
  },
  {
    target: '[data-section="tasks-to-close"]',
    content:
      'Cette section regroupe les tâches que vous avez créées et qui sont actuellement en cours. Vous pouvez les marquer comme terminées une fois le travail effectué.',
    title: 'Tâches à clôturer',
  },
  {
    target: '[data-section="tasks-to-validate"]',
    content:
      'Les tâches terminées par vos prestataires apparaissent ici. Vous devez valider leur travail en saisissant le code de validation fourni.',
    title: 'Tâches à valider',
  },
  {
    target: '[data-section="my-tasks-with-applications"]',
    content:
      'Vos tâches publiées avec des candidatures en attente de réponse sont affichées ici. Gérez les demandes des prestataires intéressés.',
    title: 'Mes tâches avec candidatures',
  },
];
