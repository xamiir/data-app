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

  const [phoneNumber, setPhoneNumber] = useState('+252 61 123 1234');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Your Purchase</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.bundleCard}>
            <Text style={styles.bundleLabel}>Weekly Super Data</Text>
            <Text style={styles.bundleAmount}>{dataAmount}</Text>
            <Text style={styles.bundlePrice}>${price}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Send bundle to</Text>
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.editButton}>
                <Edit2 size={20} color="#4A9EFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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
                phoneNumber,
              },
            })
          }>
          <Text style={styles.confirmButtonText}>
            Confirm & Pay ${price}
          </Text>
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
    backgroundColor: '#4A9EFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  bundleLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  bundleAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  bundlePrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2733',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 60,
  },
  phoneInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#4A9EFF',
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
