import RejoindreContent from './RejoindreContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rejoindre un logement - Ecopower',
  description: 'Rejoindre un logement sur Ecopower avec votre code d\'invitation',
};

export default function RejoindrePage() {
  return <RejoindreContent />;
}
