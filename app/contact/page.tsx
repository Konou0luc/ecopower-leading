import ContactContent from './ContactContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Ecopower',
  description: 'Contactez l\'équipe Ecopower pour toute question ou suggestion',
};

export default function ContactPage() {
  return <ContactContent />;
}
