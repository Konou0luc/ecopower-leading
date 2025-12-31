import jsPDF from 'jspdf';

interface Bill {
  _id: string;
  numeroFacture?: string;
  montant: number;
  dateEmission: string;
  datePaiement?: string;
  statut: string;
  consommationId: {
    _id: string;
    kwh: number;
    mois: number;
    annee: number;
  };
  details?: {
    prixKwh?: number;
    fraisFixes?: number;
  };
}

interface Resident {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface Consumption {
  kwh: number;
  mois: number;
  annee: number;
  previousIndex?: number;
  currentIndex?: number;
}

const PRIMARY_COLOR = [255, 168, 0]; // #FFA800
const PRIMARY_COLOR_DARK = [230, 149, 0]; // #E69500
const SECONDARY_COLOR = [38, 38, 38]; // #262626
const LIGHT_GRAY = [245, 245, 245]; // #F5F5F5
const DARK_GRAY = [102, 102, 102]; // #666666
const BORDER_GRAY = [224, 224, 224]; // #E0E0E0

// Formatage des nombres comme dans Flutter (NumberFormat('#,##0', 'fr_FR'))
const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const generateInvoicePdf = async (
  bill: Bill,
  resident: Resident,
  consumption: Consumption,
  maisonName: string
): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 32; // Comme dans Flutter (EdgeInsets.all(32))
  let yPos = margin;

  // Header avec gradient orange (comme Flutter)
  const headerHeight = 80;
  const headerWidth = pageWidth - 2 * margin;
  
  // Dessiner le header avec couleur principale et coins arrondis
  // jsPDF ne supporte pas bien les gradients complexes, on utilise la couleur principale
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.roundedRect(margin, yPos, headerWidth, headerHeight, 12, 12, 'F');
  
  // Ajouter un léger effet de gradient en dessinant une bande plus foncée en bas
  doc.setFillColor(PRIMARY_COLOR_DARK[0], PRIMARY_COLOR_DARK[1], PRIMARY_COLOR_DARK[2]);
  doc.roundedRect(margin, yPos + headerHeight - 25, headerWidth, 25, 0, 12, 'F');

  // ECOPOWER (taille 28, bold, blanc)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('ECOPOWER', margin + 24, yPos + 20);

  // Gestion de Consommation Électrique (taille 14, white70)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(179, 179, 179); // white70
  doc.text('Gestion de Consommation Électrique', margin + 24, yPos + 35);

  // Bouton FACTURE à droite (borderRadius 20, padding 16x8)
  const buttonWidth = 60;
  const buttonHeight = 30;
  const buttonX = pageWidth - margin - 24 - buttonWidth;
  const buttonY = yPos + 20;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 20, 20, 'F');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURE', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 3, { align: 'center' });

  yPos += headerHeight + 32; // SizedBox(height: 32)

  // Informations de la facture (UNE boîte avec Row, pas deux séparées)
  const invoiceInfoHeight = 60;
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.roundedRect(margin, yPos, headerWidth, invoiceInfoHeight, 8, 8, 'F');
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, yPos, headerWidth, invoiceInfoHeight, 8, 8, 'S');

  // Numéro de facture (gauche)
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Numéro de facture', margin + 20, yPos + 15);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  const invoiceNumber = bill.numeroFacture || `FACT-${bill._id.slice(-8).toUpperCase()}`;
  doc.text(invoiceNumber, margin + 20, yPos + 30);

  // Date d'émission (droite)
  const emissionDate = formatDate(bill.dateEmission);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.text('Date d\'émission', pageWidth - margin - 20, yPos + 15, { align: 'right' });
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(emissionDate, pageWidth - margin - 20, yPos + 30, { align: 'right' });

  yPos += invoiceInfoHeight + 24; // SizedBox(height: 24)

  // Informations du résident
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Facturé à', margin, yPos);

  yPos += 12; // SizedBox(height: 12)

  const residentInfoHeight = 70;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, headerWidth, residentInfoHeight, 8, 8, 'F');
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, headerWidth, residentInfoHeight, 8, 8, 'S');

  // Nom du résident (gauche, taille 16, bold)
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(`${resident.prenom} ${resident.nom}`, margin + 20, yPos + 25);
  
  // Maison (taille 12)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.text(maisonName, margin + 20, yPos + 40);

  // Téléphone et email (droite, taille 12)
  const rightX = pageWidth - margin - 20;
  doc.text(resident.telephone || 'N/A', rightX, yPos + 25, { align: 'right' });
  doc.text(resident.email, rightX, yPos + 40, { align: 'right' });

  yPos += residentInfoHeight + 32; // SizedBox(height: 32)

  // Tableau de consommation
  const tableWidth = headerWidth;
  const tableHeaderHeight = 40;
  const tableRowHeight = 40;
  
  // Container blanc avec border
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, tableWidth, tableHeaderHeight + tableRowHeight, 8, 8, 'F');
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, tableWidth, tableHeaderHeight + tableRowHeight, 8, 8, 'S');

  // En-tête du tableau (fond orange, borderRadius seulement en haut)
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.roundedRect(margin, yPos, tableWidth, tableHeaderHeight, 8, 8, 'F');
  // Masquer les coins du bas
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, yPos + tableHeaderHeight - 2, tableWidth, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  
  // Colonnes du tableau (Description flex 2)
  const colWidths = [
    (tableWidth - 40) * (2 / 7),  // Description (flex 2)
    (tableWidth - 40) * (1 / 7),  // Ancien Index
    (tableWidth - 40) * (1 / 7),  // Nouvel Index
    (tableWidth - 40) * (1 / 7),  // kWh
    (tableWidth - 40) * (1 / 7),  // Tarif/kWh
    (tableWidth - 40) * (1 / 7),  // Montant
  ];
  
  let xPos = margin + 20; // padding 16
  doc.text('Description', xPos, yPos + 20);
  xPos += colWidths[0];
  doc.text('Ancien Index', xPos + colWidths[1] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[1];
  doc.text('Nouvel Index', xPos + colWidths[2] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[2];
  doc.text('kWh', xPos + colWidths[3] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[3];
  doc.text('Tarif/kWh', xPos + colWidths[4] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[4];
  doc.text('Montant', xPos + colWidths[5] / 2, yPos + 20, { align: 'center' });

  yPos += tableHeaderHeight;

  // Ligne de données (padding 16)
  const prixKwh = bill.details?.prixKwh || 125;
  const ancienIndex = consumption.previousIndex || 0;
  const nouvelIndex = consumption.currentIndex || (ancienIndex + consumption.kwh);
  const consommationMontant = consumption.kwh * prixKwh;

  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  xPos = margin + 20;
  doc.text('Consommation électrique', xPos, yPos + 20, { maxWidth: colWidths[0] - 10 });
  xPos += colWidths[0];
  doc.text(ancienIndex.toString(), xPos + colWidths[1] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[1];
  doc.text(nouvelIndex.toString(), xPos + colWidths[2] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[2];
  doc.text(consumption.kwh.toFixed(2), xPos + colWidths[3] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[3];
  doc.text(`${prixKwh.toFixed(4)} FCFA`, xPos + colWidths[4] / 2, yPos + 20, { align: 'center' });
  xPos += colWidths[4];
  doc.setFont('helvetica', 'bold');
  doc.text(`${formatNumber(consommationMontant)} FCFA`, xPos + colWidths[5] / 2, yPos + 20, { align: 'center' });

  yPos += tableRowHeight + 32; // SizedBox(height: 32)

  // Résumé final (fond _lightGray, border orange 2px, borderRadius 8, padding 20)
  const fraisFixes = bill.details?.fraisFixes || 0;
  const totalTTC = bill.montant;
  // Calculer le montant de consommation comme dans Flutter: totalTTC - fraisFixes
  const montantConsommation = totalTTC - fraisFixes;

  // Vérifier si on a assez de place, sinon créer une nouvelle page
  const summaryHeight = 120;
  if (yPos + summaryHeight + 40 + 80 > pageHeight - margin) {
    doc.addPage();
    yPos = margin;
  }

  const summaryY = yPos;
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.roundedRect(margin, summaryY, headerWidth, summaryHeight, 8, 8, 'F');
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(2);
  doc.roundedRect(margin, summaryY, headerWidth, summaryHeight, 8, 8, 'S');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);

  // Consommation électrique
  let currentY = summaryY + 20;
  doc.text('Consommation électrique:', margin + 20, currentY);
  doc.text(`${formatNumber(montantConsommation)} FCFA`, pageWidth - margin - 20, currentY, { align: 'right' });

  // Frais fixes
  currentY += 8; // SizedBox(height: 8)
  doc.text('Frais fixes:', margin + 20, currentY);
  doc.text(`${formatNumber(fraisFixes)} FCFA`, pageWidth - margin - 20, currentY, { align: 'right' });

  // Divider orange
  currentY += 8;
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(1);
  doc.line(margin + 20, currentY, pageWidth - margin - 20, currentY);

  // TOTAL TTC
  currentY += 8; // SizedBox(height: 8)
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.text('TOTAL TTC:', margin + 20, currentY);

  // Container orange pour le montant total (borderRadius 6, padding 16x8)
  const totalBoxWidth = 100;
  const totalBoxHeight = 30;
  const totalBoxX = pageWidth - margin - 20 - totalBoxWidth;
  const totalBoxY = currentY - 15;
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.roundedRect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, 6, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${formatNumber(totalTTC)} FCFA`, totalBoxX + totalBoxWidth / 2, totalBoxY + totalBoxHeight / 2 + 3, { align: 'center' });

  yPos = summaryY + summaryHeight + 40; // SizedBox(height: 40)

  // Footer (fond _secondaryColor, borderRadius 8, padding 20)
  const footerHeight = 80;
  if (yPos + footerHeight > pageHeight - margin) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFillColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.roundedRect(margin, yPos, headerWidth, footerHeight, 8, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Merci pour votre confiance !', pageWidth / 2, yPos + 25, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(179, 179, 179); // white70
  doc.text(
    'Pour toute question concernant cette facture, n\'hésitez pas à nous contacter.',
    pageWidth / 2,
    yPos + 45,
    { align: 'center', maxWidth: headerWidth - 40 }
  );

  doc.setFontSize(10);
  doc.setTextColor(153, 153, 153); // white60
  doc.text('© 2024 Ecopower - Tous droits réservés', pageWidth / 2, yPos + 65, { align: 'center' });

  // Télécharger le PDF
  const fileName = `Facture_${invoiceNumber}.pdf`;
  doc.save(fileName);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
