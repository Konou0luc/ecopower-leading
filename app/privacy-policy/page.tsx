import PrivacyPolicyContent from './PrivacyPolicyContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Ecopower',
  description: 'Politique de confidentialité d\'Ecopower - Protection de vos données personnelles',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
