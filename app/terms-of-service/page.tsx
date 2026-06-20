import TermsOfServiceContent from './TermsOfServiceContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions d\'Utilisation - Ecopower',
  description: 'Conditions générales d\'utilisation de l\'application Ecopower',
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
