
import React, { useState } from "react";
import { Link, router } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";

export default function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

const handleLogin = (): void => {
  const trimmedEmail = email.trim();

  if (trimmedEmail === "" || password === "") {
    setMessage("Enter your email and password to continue.");
    return;
  }
  
  const emailLooksValid =
    trimmedEmail.includes("@") && trimmedEmail.includes(".");

  if (!emailLooksValid) {
    setMessage("Enter a valid email address.");
    return;
  }

  setMessage("Sign-in is ready for your authentication service to be connected.");
};
   
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.wrapper}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Login to your VerifyDoc account
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>Password</Text>

                  <Link href="/forgot-password" asChild>
                    <Pressable accessibilityRole="link">
                      <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </Pressable>
                  </Link>
                </View>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                  >
                    <View style={styles.eyeIcon}>
                      <View style={styles.eyePupil} />
                      {showPassword ? <View style={styles.eyeSlash} /> : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {message ? <Text accessibilityRole="alert" style={styles.message}>{message}</Text> : null}

            </View>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              accessibilityRole="button"
              onPress={() => {
                if (router.canGoBack()) router.back();
              }}
            >
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* Create Account */}
            <View style={styles.signupContainer}>
              <Text style={styles.accountText}>
                Don&apos;t have an account?
              </Text>

              <Link href="/register" asChild>
                <Pressable accessibilityRole="link">
                  <Text style={styles.createAccount}>Create an account</Text>
                </Pressable>
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    height: 54,
    marginTop: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1769AA",
    borderRadius: 10,
  },

  backArrow: {
    fontSize: 30,
    lineHeight: 30,
    color: "#FFFFFF",
    marginRight: 5,
  },

  backText: {
    fontSize: 15,
    color: "#1769AA",
    fontWeight: "500",
  },

  header: {
    marginBottom: 38,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    textAlign: "center",
  },

  form: {
    width: "100%",
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 9,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },

  forgotPassword: {
    fontSize: 13,
    color: "#1769AA",
    fontWeight: "500",
  },

  passwordContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 14,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  eyeButton: {
    width: 32,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeIcon: {
    width: 21,
    height: 14,
    borderWidth: 1.7,
    borderColor: "#1769AA",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  eyePupil: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1769AA",
  },

  eyeSlash: {
    position: "absolute",
    width: 25,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#1769AA",
    transform: [{ rotate: "-42deg" }],
  },

  loginButton: {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#1769AA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  message: {
    marginTop: 14,
    color: "#9A4B26",
    fontSize: 13,
    lineHeight: 19,
  },

  signupContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 8,
  },

  accountText: {
    fontSize: 14,
    color: "#6B7280",
  },

  createAccount: {
    fontSize: 14,
    color: "#1769AA",
    fontWeight: "600",
  },
});