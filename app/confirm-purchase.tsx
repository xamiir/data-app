import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Edit2 } from 'lucide-react-native';

export default function ConfirmPurchaseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    bundleId,
    bundleName,
    dataAmount,
    duration,
    price,
    providerId,
    providerName,
  } = params;

  const [phoneNumber, setPhoneNumber] = useState('61 555 1234');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Your Purchase</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Bundle Card */}
          <View style={styles.bundleCard}>
            <View style={styles.bundleHeader}>
              <View style={styles.providerLogo} />
              <View>
                <Text style={styles.providerName}>
                  {providerName || 'Hormuud Telecom'}
                </Text>
              </View>
            </View>
            <Text style={styles.bundleName}>
              {bundleName || 'Weekly Super Data'}
            </Text>
            <Text style={styles.bundleDetails}>
              {dataAmount || '5GB'} / {duration || '7 Days'}
            </Text>
            <Text style={styles.bundlePrice}>${price || '2.00'}</Text>
          </View>

          {/* Phone Number */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Send bundle to</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.prefix}>+252</Text>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="61 555 1234"
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
              <TouchableOpacity style={styles.editButton}>
                <Edit2 size={18} color="#4A6CF7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            router.push({
              pathname: '/payment-method',
              params: {
                bundleId,
                bundleName,
                dataAmount,
                duration,
                price,
                providerId,
                providerName,
                phoneNumber: `+252 ${phoneNumber}`,
              },
            })
          }
        >
          <Text style={styles.confirmButtonText}>
            Confirm & Pay ${price || '2.00'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F17', // dark navy
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
  content: {
    padding: 24,
  },
  bundleCard: {
    backgroundColor: '#121826',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  bundleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4A6CF7',
    marginRight: 10,
  },
  providerName: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  bundleName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bundleDetails: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 8,
  },
  bundlePrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121826',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 56,
  },
  prefix: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    padding: 6,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#4A6CF7',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
