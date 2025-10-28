import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native'; // Import icons
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    try {
      await signup(email, password);
      Alert.alert('Signup Successful!', 'Please log in with your new account.');
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* 1. Logo */}
            <Image
              // Replace with your local logo asset
              source={{
                uri: 'https://placehold.co/150x50/f0f0f0/333?text=WellHub&font=sans',
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* 2. Welcome Message */}
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Get started by creating your account.
            </Text>

            {/* 3. Signup Form */}
            <View style={styles.form}>
              {/* Optional: Add a Name field */}
              {/* <View style={styles.inputContainer}>
                <User
                  color="#6B7280"
                  size={20}
                  style={styles.inputIcon}
                  strokeWidth={1.5}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="words"
                />
              </View> */}

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Mail
                  color="#6B7280"
                  size={20}
                  style={styles.inputIcon}
                  strokeWidth={1.5}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Lock
                  color="#6B7280"
                  size={20}
                  style={styles.inputIcon}
                  strokeWidth={1.5}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff color="#6B7280" size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye color="#6B7280" size={20} strokeWidth={1.5} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Lock
                  color="#6B7280"
                  size={20}
                  style={styles.inputIcon}
                  strokeWidth={1.5}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#6B7280"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? (
                    <EyeOff color="#6B7280" size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye color="#6B7280" size={20} strokeWidth={1.5} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Error Message */}
              {error ? <Text style={styles.error}>{error}</Text> : null}

              {/* 5. Signup Button */}
              <TouchableOpacity
                style={[styles.button, { marginTop: 16 }]} // Added margin
                onPress={handleSignup}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* 8. Sign In Link */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.signupContainer}
            >
              <Text style={styles.signupText}>
                Already have an account?{' '}
                <Text style={styles.link}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// Re-using the same styles from LoginScreen for consistency
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB', // bg-gray-50
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  logo: {
    height: 40,
    width: 150,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28, // text-3xl
    fontWeight: 'bold',
    color: '#111827', // text-gray-900
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280', // text-gray-500
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32, // mb-8
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // bg-gray-100
    borderRadius: 8, // rounded-lg
    borderWidth: 1,
    borderColor: '#E5E7EB', // border-gray-300
    marginBottom: 16,
  },
  inputIcon: {
    marginLeft: 12, // pl-3
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    padding: 12, // p-3
  },
  link: {
    color: '#4F46E5', // text-indigo-600
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4F46E5', // bg-indigo-600
    paddingVertical: 14,
    borderRadius: 8, // rounded-lg
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#374151',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  // Styles below are not used in SignupScreen but kept for copy-paste consistency
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32, // my-8
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB', // border-gray-300
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16, // Use 'gap' or 'marginHorizontal' on children
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  socialButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});
