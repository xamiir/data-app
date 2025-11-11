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
import {
  ArrowLeft,
  Calendar,
  Star,
  Plane,
  MessageCircle,
  Share2,
  Sun,
} from 'lucide-react-native';

interface BundleCategory {
  id: string;
  name: string;
  description: string;
}

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
    const mockCategories: BundleCategory[] = [
      { id: '1', name: 'Daily Bundles', description: 'For 24-hour access' },
      { id: '2', name: 'Weekly Bundles', description: 'For 7-day access' },
      { id: '3', name: 'Monthly Bundles', description: 'For 30-day access' },
      { id: '4', name: 'Social Bundles', description: 'For social media' },
      { id: '5', name: 'Special Offers', description: 'Exclusive deals' },
      { id: '6', name: 'Roaming', description: 'Stay connected' },
    ];

    setCategories(mockCategories);
    setIsLoading(false);
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Daily Bundles':
        return <Sun size={22} color="#4A6CF7" />;
      case 'Weekly Bundles':
        return <Calendar size={22} color="#4A6CF7" />;
      case 'Monthly Bundles':
        return <Calendar size={22} color="#4A6CF7" />;
      case 'Social Bundles':
        return <Share2 size={22} color="#4A6CF7" />;
      case 'Special Offers':
        return <Star size={22} color="#4A6CF7" />;
      case 'Roaming':
        return <Plane size={22} color="#4A6CF7" />;
      default:
        return <MessageCircle size={22} color="#4A6CF7" />;
    }
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
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a Category</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Categories */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.card}
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
              }
            >
              <View style={styles.icon}>{getCategoryIcon(category.name)}</View>
              <Text style={styles.cardTitle}>{category.name}</Text>
              <Text style={styles.cardDesc}>{category.description}</Text>
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
    backgroundColor: '#0B0F17', // dark background
    paddingTop: 60,
    paddingHorizontal: 20,
  },
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
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#121826',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1F2A44',
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  icon: {
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },
});
