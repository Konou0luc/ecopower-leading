import SuppressionDonneesContent from './SuppressionDonneesContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppression des données - Ecopower',
  description: 'Comment demander la suppression de vos données personnelles sur Ecopower (application, compte, messages).',
};

export default function SuppressionDonneesPage() {
  return <SuppressionDonneesContent />;
}
