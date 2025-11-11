import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Clock, User, Headphones } from 'lucide-react-native';

export default function HomeScreen() {
  const [providers, setProviders] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const mockProviders = [
      {
        id: '1',
        name: 'Hormuud',
        color: '#3578EF',
        logo: require('@/assets/images/hormuud.png'),
      },
      {
        id: '2',
        name: 'Somtel',
        color: '#27AE60',
        logo: require('@/assets/images/hormuud.png'),
      },
      {
        id: '3',
        name: 'Golis',
        color: '#E4572E',
        logo: require('@/assets/images/hormuud.png'),
      },
      {
        id: '4',
        name: 'Telesom',
        color: '#F5A623',
        logo: require('@/assets/images/hormuud.png'),
      },
    ];

    const mockTransactions = [
      {
        id: '1',
        provider: 'Somtel',
        bundle: '10 GB Weekly',
        price: 5.0,
        time: '15 min ago',
      },
      {
        id: '2',
        provider: 'Hormuud',
        bundle: '2 GB Daily',
        price: 1.0,
        time: 'Yesterday',
      },
      {
        id: '3',
        provider: 'Golis',
        bundle: '25 GB Monthly',
        price: 10.0,
        time: 'Oct 28, 2023',
      },
    ];

    setProviders(mockProviders);
    setRecentTransactions(mockTransactions);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6CF7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.username}>
            {user?.full_name || 'BixiNet User'}
          </Text>
        </View>
        <TouchableOpacity style={styles.profileCircle} />
      </View>

      {/* Providers */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Choose Your Provider</Text>

        <View style={styles.providersGrid}>
          {providers.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.providerCard, { backgroundColor: p.color }]}
              onPress={() =>
                router.push({
                  pathname: '/categories',
                  params: { providerId: p.id, providerName: p.name },
                })
              }
            >
              <View style={styles.providerLogoBox}>
                <Image
                  source={p.logo}
                  style={styles.providerLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.providerName}>{p.name}</Text>
              <Text style={styles.viewBundles}>View Bundles</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>

          {recentTransactions.map((t) => (
            <View key={t.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon} />
                <View>
                  <Text style={styles.transactionName}>
                    {t.provider} Bundle
                  </Text>
                  <Text style={styles.transactionBundle}>{t.bundle}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.transactionAmount}>
                  ${t.price.toFixed(2)}
                </Text>
                <Text style={styles.transactionTime}>{t.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0F17',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 20,
  },
  welcomeText: { color: '#9CA3AF', fontSize: 14 },
  username: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4B183',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  providersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  providerCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  providerLogoBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 8,
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  providerLogo: { width: '100%', height: '100%' },
  providerName: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  viewBundles: { color: 'rgba(255,255,255,0.9)', fontSize: 12 },
  transactionsSection: { paddingHorizontal: 24, marginTop: 20 },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  transactionsTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  seeAll: { color: '#4A6CF7', fontSize: 14, fontWeight: '600' },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C2733',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionLeft: { flexDirection: 'row', alignItems: 'center' },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: 12,
  },
  transactionName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  transactionBundle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  transactionAmount: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'right',
  },
  transactionTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'right',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderColor: '#1C2733',
    backgroundColor: '#0F141A',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navItemActive: { alignItems: 'center', gap: 4 },
  navText: { color: '#9CA3AF', fontSize: 12 },
  navTextActive: { color: '#4A6CF7', fontSize: 12, fontWeight: '700' },
});
