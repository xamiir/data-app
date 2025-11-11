import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Smartphone, Wifi, Phone } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    // Static mock data
    const mockTransactions = [
      {
        id: '1',
        amount: 5.0,
        status: 'completed',
        transaction_date: new Date('2024-11-10T10:00:00Z'),
        bundles: { name: 'Data Bundle', data_amount: '1GB' },
        providers: { name: 'Hormud' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '3',
        amount: 15.0,
        status: 'failed',
        transaction_date: new Date('2024-11-08T09:15:00Z'),
        bundles: { name: 'Data Bundle', data_amount: '5GB' },
        providers: { name: 'Golis' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '2',
        amount: 10.0,
        status: 'completed',
        transaction_date: new Date('2024-11-09T14:30:00Z'),
        bundles: { name: 'Voice Bundle', data_amount: '100 mins' },
        providers: { name: 'Somtel' },
      },
      {
        id: '3',
        amount: 15.0,
        status: 'failed',
        transaction_date: new Date('2024-11-08T09:15:00Z'),
        bundles: { name: 'Data Bundle', data_amount: '5GB' },
        providers: { name: 'Golis' },
      },
    ];

    setTransactions(mockTransactions);
    setIsLoading(false);
  };

  const getIcon = (providerName: string) => {
    switch (providerName?.toLowerCase()) {
      case 'hormud':
        return <Smartphone size={20} color="#4169E1" />;
      case 'somtel':
        return <Wifi size={20} color="#32CD32" />;
      case 'golis':
        return <Phone size={20} color="#FF4500" />;
      case 'telesom':
        return <Smartphone size={20} color="#FFA500" />;
      default:
        return <Smartphone size={20} color="#4A9EFF" />;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A9EFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {transactions.length > 0 ? (
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionIcon}>
                  {getIcon(transaction.providers?.name)}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>
                    {transaction.providers?.name}{' '}
                    {transaction.bundles?.data_amount}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.transaction_date).toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                    {', '}
                    {new Date(transaction.transaction_date).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      }
                    )}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text
                    style={[
                      styles.amountText,
                      transaction.status === 'completed'
                        ? styles.amountSuccess
                        : styles.amountFailed,
                    ]}
                  >
                    -${transaction.amount.toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      transaction.status === 'completed'
                        ? styles.statusSuccess
                        : styles.statusFailed,
                    ]}
                  >
                    {transaction.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Smartphone size={48} color="#6B7280" />
            </View>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySubtitle}>
              Your transaction history will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E13',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0E13',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C2733',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  menuDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
  },
  transactionsList: {
    padding: 24,
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2733',
    borderRadius: 16,
    padding: 16,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 158, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  amountSuccess: {
    color: '#32CD32',
  },
  amountFailed: {
    color: '#FF4500',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusSuccess: {
    color: '#32CD32',
  },
  statusFailed: {
    color: '#FF4500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    marginTop: 80,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1C2733',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
