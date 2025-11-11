import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Wifi, Menu } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Bundle } from '@/types/database';

export default function BundlesScreen() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { providerId, providerName, categoryId, categoryName } = params;

  useEffect(() => {
    loadBundles();
  }, []);

  const loadBundles = async () => {
    try {
      const { data } = await supabase
        .from('bundles')
        .select('*')
        .eq('provider_id', providerId)
        .eq('category_id', categoryId)
        .order('price');

      if (data && data.length === 0) {
        const sampleBundles = [
          {
            provider_id: providerId,
            category_id: categoryId,
            name: '1GB',
            data_amount: '1GB',
            duration: 'Valid for 24 hours',
            price: 2.0,
          },
          {
            provider_id: providerId,
            category_id: categoryId,
            name: '2GB',
            data_amount: '2GB',
            duration: 'Valid for 24 hours',
            price: 3.5,
          },
          {
            provider_id: providerId,
            category_id: categoryId,
            name: '5GB',
            data_amount: '5GB',
            duration: 'Valid for 30 hours',
            price: 7.95,
          },
          {
            provider_id: providerId,
            category_id: categoryId,
            name: '10GB',
            data_amount: '10GB',
            duration: 'Valid for 30 hours',
            price: 12.0,
          },
        ];

        const { data: insertedData } = await supabase
          .from('bundles')
          .insert(sampleBundles)
          .select();

        if (insertedData) {
          setBundles(insertedData);
        }
      } else if (data) {
        setBundles(data);
      }
    } catch (error) {
      console.error('Error loading bundles:', error);
    } finally {
      setIsLoading(false);
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>{providerName}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bundlesList}>
          {bundles.map((bundle) => (
            <View key={bundle.id} style={styles.bundleCard}>
              <View style={styles.bundleHeader}>
                <View style={styles.bundleIcon}>
                  <Wifi size={24} color="#4A9EFF" />
                </View>
                <View style={styles.bundleInfo}>
                  <Text style={styles.bundleAmount}>{bundle.data_amount}</Text>
                  <Text style={styles.bundleDuration}>{bundle.duration}</Text>
                </View>
              </View>

              <View style={styles.bundleFooter}>
                <Text style={styles.bundlePrice}>
                  ${bundle.price.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() =>
                    router.push({
                      pathname: '/confirm-purchase',
                      params: {
                        bundleId: bundle.id,
                        bundleName: bundle.name,
                        dataAmount: bundle.data_amount,
                        duration: bundle.duration,
                        price: bundle.price.toString(),
                        providerId,
                        providerName,
                      },
                    })
                  }>
                  <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C2733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C2733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bundlesList: {
    padding: 24,
    gap: 16,
  },
  bundleCard: {
    backgroundColor: '#1C2733',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  bundleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bundleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 158, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bundleInfo: {
    flex: 1,
  },
  bundleAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bundleDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bundleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bundlePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4A9EFF',
  },
  buyButton: {
    backgroundColor: '#4A9EFF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
