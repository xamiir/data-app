import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Provider } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: providersData } = await supabase
        .from('providers')
        .select('*')
        .order('name');

      if (providersData) {
        setProviders(providersData);
      }

      if (user) {
        const { data: transactionsData } = await supabase
          .from('transactions')
          .select('*, bundles(name, data_amount, duration), providers(name)')
          .eq('user_id', user.id)
          .order('transaction_date', { ascending: false })
          .limit(3);

        if (transactionsData) {
          setRecentTransactions(transactionsData);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderColor = (color: string) => {
    const colors: { [key: string]: string } = {
      '#4169E1': '#4169E1',
      '#32CD32': '#32CD32',
      '#FF4500': '#FF4500',
      '#FFA500': '#FFA500',
    };
    return colors[color] || '#4A9EFF';
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
        <View>
          <Text style={styles.greeting}>Hello, {user?.full_name || 'Valued User'}</Text>
          <Text style={styles.subtitle}>Choose Your Provider</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.providersGrid}>
          {providers.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={[
                styles.providerCard,
                { backgroundColor: getProviderColor(provider.color) },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/categories',
                  params: { providerId: provider.id, providerName: provider.name },
                })
              }>
              <View style={styles.providerIcon}>
                <Smartphone size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.providerDescription}>
                {provider.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionIcon}>
                  <Smartphone size={20} color="#4A9EFF" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>
                    {transaction.providers?.name} Bundle
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.transaction_date).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  ${transaction.amount.toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent transactions</Text>
            </View>
          )}
        </View>
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
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C2733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4500',
  },
  providersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  providerCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
  },
  providerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  providerDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2733',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#32CD32',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
