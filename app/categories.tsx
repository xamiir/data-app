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
import { ArrowLeft, Calendar, Star, Plane, Zap, MessageCircle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { BundleCategory } from '@/types/database';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<BundleCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { providerId, providerName } = params;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await supabase
        .from('bundle_categories')
        .select('*')
        .order('name');

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Daily Bundles':
        return <Calendar size={24} color="#FFFFFF" />;
      case 'Weekly Bundles':
        return <Calendar size={24} color="#FFFFFF" />;
      case 'Monthly Bundles':
        return <Calendar size={24} color="#FFFFFF" />;
      case 'Social Bundles':
        return <MessageCircle size={24} color="#FFFFFF" />;
      case 'Special Offers':
        return <Star size={24} color="#FFFFFF" />;
      case 'Roaming':
        return <Plane size={24} color="#FFFFFF" />;
      default:
        return <Zap size={24} color="#FFFFFF" />;
    }
  };

  const getCategoryColor = (name: string) => {
    switch (name) {
      case 'Daily Bundles':
        return '#4169E1';
      case 'Weekly Bundles':
        return '#9370DB';
      case 'Monthly Bundles':
        return '#FF6B6B';
      case 'Social Bundles':
        return '#4ECDC4';
      case 'Special Offers':
        return '#FFD93D';
      case 'Roaming':
        return '#FF6B9D';
      default:
        return '#4A9EFF';
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
        <Text style={styles.headerTitle}>Choose a Category</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.providerBanner}>
        <Text style={styles.providerName}>{providerName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: getCategoryColor(category.name) },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/bundles',
                  params: {
                    providerId,
                    providerName,
                    categoryId: category.id,
                    categoryName: category.name,
                  },
                })
              }>
              <View style={styles.categoryIcon}>
                {getCategoryIcon(category.name)}
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
              </View>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  providerBanner: {
    backgroundColor: '#1C2733',
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  providerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoriesGrid: {
    padding: 24,
    gap: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
