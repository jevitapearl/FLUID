import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import {
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
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

// Social media icon placeholders (simple text)
const GoogleIcon = () => (
  <Text style={styles.socialIconText}>G</Text>
);
const AppleIcon = () => <Text style={styles.socialIconText}>A</Text>; // Placeholder
const FacebookIcon = () => (
  <Text style={styles.socialIconText}>f</Text>
);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // Clear previous errors
    try {
      await login(email, password);
      // Navigation to main app is handled by AppNavigator
    } catch (err) {
      let friendlyError = 'Login Failed. Please check your email and password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        friendlyError = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyError = 'That email address is not valid.';
      }
      setError(friendlyError);
      // Alert.alert('Login Failed', friendlyError); // We show error inline instead
    }
  };

  return (
    <LinearGradient
      colors={['#FDFDFF', '#aaf4f3ff']} // Light gradient
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* 1. Illustration */}
            <View style={styles.imageContainer}>
              <Image
              source={require('../../../assets/images/login-art.png')} 
              style={styles.image}
              resizeMode="contain"
            />
            </View>

            {/* 2. Titles */}
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>
              Welcome back you've been missed!
            </Text>

            {/* 3. Form */}
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Mail
                color="#AEAEB2"
                size={20}
                style={styles.inputIcon}
                strokeWidth={1.5}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#AEAEB2"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Lock
                color="#AEAEB2"
                size={20}
                style={styles.inputIcon}
                strokeWidth={1.5}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#AEAEB2"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff color="#AEAEB2" size={20} strokeWidth={1.5} />
                ) : (
                  <Eye color="#AEAEB2" size={20} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* 4. Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotLink}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* 5. Login Button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
              <LinearGradient
                colors={['#C94AF5', '#9D47F5']} // Pink/purple gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* 6. Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 7. Social Logins */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <GoogleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AppleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FacebookIcon />
              </TouchableOpacity>
            </View>

            {/* 8. Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign up now</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// New Stylesheet for the dark-mode design
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30, // More padding
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 250,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#A0A0A0', // Light gray
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 14,
    marginBottom: 15,
  },
  inputIcon: {
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 55, // Taller inputs
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotLink: {
    color: '#C94AF5', // Pink color from button
    fontWeight: '600',
    fontSize: 14,
  },
  loginButtonContainer: {
    borderRadius: 14,
    overflow: 'hidden', // Ensures gradient stays in bounds
    shadowColor: '#C94AF5',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: '#A0A0A0',
    marginHorizontal: 15,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Perfect circle
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#A0A0A0',
    fontSize: 15,
  },
  signupLink: {
    color: '#C94AF5', // Pink color
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 15,
  },
  error: {
    color: '#FF6B6B', // A light red for dark mode
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

