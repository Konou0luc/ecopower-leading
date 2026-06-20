import QuickStartContent from './QuickStartContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide rapide - Ecopower',
  description: 'Guide rapide pour bien utiliser l’application mobile Ecopower.',
};

export default function QuickStartPage() {
  return <QuickStartContent />;
}
