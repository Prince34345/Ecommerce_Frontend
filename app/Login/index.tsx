// /app/(auth)/sign-in
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useAuth } from "@/context/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function SignIn() {
    const { signIn } = useAuth();
    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    return (
        <>
            <Stack.Screen options={{ title: "Sign Up", headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        nativeID="email"
                        onChangeText={(text) => {
                            emailRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        nativeID="password"
                        onChangeText={(text) => {
                            passwordRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity
                    onPress={async () => {
                        const { data, error } = await signIn(
                            emailRef.current,
                            passwordRef.current
                        );
                        if (data) {
                            router.replace("/");
                        } else {
                            console.log(error);
                            // Alert.alert("Login Error", resp.error?.message);
                        }
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text
                        style={styles.registerText}
                        onPress={() => router.push("/Register/")}
                    >
                        Click Here To Create A New Account
                    </Text>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
        color: "#555",
        fontSize: 16,
        fontWeight: "600",
    },
    textInput: {
        width: 280,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#e4e4e4",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        backgroundColor: "#888",
        padding: 14,
        width: 280,
        borderRadius: 8,
        marginTop: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    registerContainer: {
        marginTop: 32,
    },
    registerText: {
        fontWeight: "500",
        color: "#333",
        textDecorationLine: "underline",
    }
});  