import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { emailSchema } from "../schemas/emailSchema";
import InputText from "../components/InputText";

const { width } = Dimensions.get("window");

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();
  }, []);

  const handleSubmit = () => {
    setMessage("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setMessage(`❌ ${result.error.errors[0].message}`);
      return;
    }

    if (password.length <= 4) {
      setMessage("❌ La contraseña debe tener más de 4 caracteres.");
      return;
    }

    if (password !== "12345") {
      setMessage("❌ Contraseña incorrecta.");
      return;
    }

    setMessage("✅ Verificación exitosa. Bienvenido/a!");
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.container,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            {/* Header */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoIcon}>📧</Text>
              </View>
              <Text style={styles.title}>Verificación de Email</Text>
              <Text style={styles.subtitle}>
                Asegúrate de ingresar un correo válido y seguro.
              </Text>
            </View>

            {/* Formulario */}
            <View style={styles.formCard}>
              <Text style={styles.label}>Correo electrónico</Text>
              <InputText
                value={email}
                onChange={setEmail}
                schema={emailSchema}
                placeholder="tucorreo@gmail.com"
                helperText="Ingresa tu correo electrónico, por ejemplo example@gmail.com"
              />

              <Text style={[styles.label, { marginTop: 10 }]}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="•••••••"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.helperText}>
                La contraseña debe tener más de 4 caracteres
              </Text>

              {message ? (
                <Text
                  style={[
                    styles.message,
                    message.includes("✅") ? styles.success : styles.error,
                  ]}
                >
                  {message}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Verificar Email</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.link}>¿Necesitas ayuda?</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: { alignItems: "center", paddingHorizontal: 25, paddingVertical: 40 },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoIcon: { fontSize: 42, color: "#fff" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff", marginTop: 10 },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginHorizontal: 10,
  },
  formCard: {
    width: width * 0.9,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  helperText: { fontSize: 13, color: "#777", marginTop: 4 },
  message: { textAlign: "center", marginTop: 15, fontWeight: "600" },
  success: { color: "#27ae60" },
  error: { color: "#e74c3c" },
  button: {
    backgroundColor: "#2575fc",
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 15,
    shadowColor: "#2575fc",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  link: {
    color: "#4a00e0",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600",
  },
});
