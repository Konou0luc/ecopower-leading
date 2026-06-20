import LegalNoticeContent from './LegalNoticeContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - Ecopower',
  description: 'Mentions légales et informations sur Ecopower',
};

export default function LegalNoticePage() {
  return <LegalNoticeContent />;
}
