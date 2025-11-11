import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle2, Share2 } from 'lucide-react-native';

export default function ReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    transactionId,
    bundleName,
    dataAmount,
    price,
    providerName,
    phoneNumber,
    paymentMethod,
  } = params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Receipt\n\nBundle: ${dataAmount}\nAmount: $${price}\nProvider: ${providerName}\nTransaction ID: ${transactionId}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <CheckCircle2 size={64} color="#32CD32" />
        </View>

        <Text style={styles.title}>Purchase Successful</Text>
        <Text style={styles.subtitle}>
          Your data bundle has been activated
        </Text>

        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Bundle</Text>
            <Text style={styles.receiptValue}>{dataAmount}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Somtel</Text>
            <Text style={styles.receiptValue}>{phoneNumber}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Method</Text>
            <Text style={styles.receiptValue}>
              {paymentMethod === 'evc'
                ? 'EVC Plus'
                : paymentMethod === 'edahab'
                ? 'Edahab'
                : 'Premier Wallet'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Transaction ID</Text>
            <Text style={styles.receiptValue}>{transactionId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date & Time</Text>
            <Text style={styles.receiptValue}>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              {new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${price}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 size={20} color="#4A9EFF" />
          <Text style={styles.shareButtonText}>Save Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E13',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  successIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  receiptCard: {
    backgroundColor: '#1C2733',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2D3748',
  },
  totalCard: {
    backgroundColor: 'rgba(74, 158, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A9EFF',
  },
  totalLabel: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A9EFF',
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 158, 255, 0.1)',
    borderRadius: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#4A9EFF',
    gap: 8,
  },
  shareButtonText: {
    color: '#4A9EFF',
    fontSize: 16,
    fontWeight: '700',
  },
  doneButton: {
    backgroundColor: '#4A9EFF',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
