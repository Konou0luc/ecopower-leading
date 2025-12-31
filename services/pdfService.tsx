import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

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

// Styles correspondant exactement au design Flutter
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#FFA800',
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#E69500',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerLeft: {
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#B3FFFFFF', // white70
  },
  headerBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'relative',
    zIndex: 1,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFA800',
  },
  invoiceInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA800',
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceInfoLeft: {
    flexDirection: 'column',
  },
  invoiceInfoRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceInfoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  invoiceInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  residentInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    padding: 20,
    marginBottom: 32,
  },
  residentInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 12,
  },
  residentInfoRow: {
    flexDirection: 'row',
  },
  residentInfoLeft: {
    flex: 1,
    flexDirection: 'column',
  },
  residentInfoRight: {
    flex: 1,
    flexDirection: 'column',
  },
  residentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 4,
  },
  residentText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 32,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#FFA800',
    padding: 16,
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tableRow: {
    padding: 16,
    flexDirection: 'row',
  },
  tableCell: {
    fontSize: 12,
    color: '#262626',
  },
  tableCellBold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#262626',
  },
  colDescription: {
    flex: 2,
  },
  colStandard: {
    flex: 1,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFA800',
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#262626',
  },
  summaryDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFA800',
    marginVertical: 8,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA800',
  },
  summaryTotalBox: {
    backgroundColor: '#FFA800',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

// Formatage des nombres comme dans Flutter (NumberFormat('#,##0', 'fr_FR'))
const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// Formatage de la date comme dans Flutter (DateFormat('dd/MM/yyyy'))
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Composant du document PDF
const InvoiceDocument: React.FC<{
  bill: Bill;
  resident: Resident;
  consumption: Consumption;
  maisonName: string;
}> = ({ bill, resident, consumption, maisonName }) => {
  const prixKwh = bill.details?.prixKwh || 125;
  const fraisFixes = bill.details?.fraisFixes || 0;
  const totalTTC = bill.montant;
  const montantConsommation = totalTTC - fraisFixes;
  const ancienIndex = consumption.previousIndex || 0;
  const nouvelIndex = consumption.currentIndex || (ancienIndex + consumption.kwh);
  const consommationMontant = consumption.kwh * prixKwh;
  const invoiceNumber = bill.numeroFacture || `FACT-${bill._id.slice(-8).toUpperCase()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerGradientOverlay} />
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>ECOPOWER</Text>
            <Text style={styles.headerSubtitle}>Gestion de Consommation Électrique</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>FACTURE</Text>
          </View>
        </View>

        {/* Informations de la facture */}
        <View style={styles.invoiceInfo}>
          <View style={styles.invoiceInfoLeft}>
            <Text style={styles.invoiceInfoLabel}>Numéro de facture</Text>
            <Text style={styles.invoiceInfoValue}>{invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceInfoRight}>
            <Text style={styles.invoiceInfoLabel}>Date d'émission</Text>
            <Text style={styles.invoiceInfoValue}>{formatDate(bill.dateEmission)}</Text>
          </View>
        </View>

        {/* Informations du résident */}
        <View style={styles.residentInfo}>
          <Text style={styles.residentInfoTitle}>Facturé à</Text>
          <View style={styles.residentInfoRow}>
            <View style={styles.residentInfoLeft}>
              <Text style={styles.residentName}>{resident.prenom} {resident.nom}</Text>
              <Text style={styles.residentText}>{maisonName}</Text>
            </View>
            <View style={styles.residentInfoRight}>
              <Text style={styles.residentText}>{resident.telephone || 'N/A'}</Text>
              <Text style={styles.residentText}>{resident.email}</Text>
            </View>
          </View>
        </View>

        {/* Tableau de consommation */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.colStandard]}>Ancien Index</Text>
            <Text style={[styles.tableHeaderText, styles.colStandard]}>Nouvel Index</Text>
            <Text style={[styles.tableHeaderText, styles.colStandard]}>kWh</Text>
            <Text style={[styles.tableHeaderText, styles.colStandard]}>Tarif/kWh</Text>
            <Text style={[styles.tableHeaderText, styles.colStandard]}>Montant</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.colDescription]}>Consommation électrique</Text>
            <Text style={[styles.tableCell, styles.colStandard]}>{ancienIndex}</Text>
            <Text style={[styles.tableCell, styles.colStandard]}>{nouvelIndex}</Text>
            <Text style={[styles.tableCell, styles.colStandard]}>{consumption.kwh.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.colStandard]}>{prixKwh.toFixed(4)} FCFA</Text>
            <Text style={[styles.tableCellBold, styles.colStandard]}>{formatNumber(consommationMontant)} FCFA</Text>
          </View>
        </View>

        {/* Résumé final */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Consommation électrique:</Text>
            <Text style={styles.summaryText}>{formatNumber(montantConsommation)} FCFA</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Frais fixes:</Text>
            <Text style={styles.summaryText}>{formatNumber(fraisFixes)} FCFA</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>TOTAL TTC:</Text>
            <View style={styles.summaryTotalBox}>
              <Text style={styles.summaryTotalText}>{formatNumber(totalTTC)} FCFA</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Fonction principale pour générer et télécharger le PDF
export const generateInvoicePdf = async (
  bill: Bill,
  resident: Resident,
  consumption: Consumption,
  maisonName: string
): Promise<void> => {
  try {
    const doc = <InvoiceDocument bill={bill} resident={resident} consumption={consumption} maisonName={maisonName} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const invoiceNumber = bill.numeroFacture || `FACT-${bill._id.slice(-8).toUpperCase()}`;
    link.download = `Facture_${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw error;
  }
};
