import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { ZodSchema } from "zod";

interface InputTextProps {
  value: string;
  onChange: (text: string) => void;
  schema: ZodSchema<string>;
  placeholder?: string;
  helperText?: string;
  secureTextEntry?: boolean;
}

export default function InputText({
  value,
  onChange,
  schema,
  placeholder,
  helperText,
  secureTextEntry = false,
}: InputTextProps) {
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    onChange(text);
    const result = schema.safeParse(text);
    if (!result.success) setError(result.error.errors[0].message);
    else setError("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        style={[styles.input, error ? styles.inputError : null]}
        autoCapitalize="none"
        keyboardType="email-address"
        secureTextEntry={secureTextEntry}
      />
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  inputError: { borderColor: "red" },
  helper: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
  },
});
