// /app/(auth)/sign-up
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useAuth } from "@/context/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
    const { signUp } = useAuth();
    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const userNameRef = useRef("");

    return (
        <>
            <Stack.Screen options={{ title: "sign up", headerShown: false }} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <Text style={styles.label}>UserName</Text>
                    <TextInput
                        placeholder="Username"
                        autoCapitalize="none"
                        nativeID="userName"
                        onChangeText={(text) => {
                            userNameRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="email"
                        autoCapitalize="none"
                        nativeID="email"
                        onChangeText={(text) => {
                            emailRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="password"
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
                        const { data, error } = await signUp(
                            emailRef.current,
                            passwordRef.current,
                            userNameRef.current
                        );
                        if (data) {
                            router.push("/");
                        } else {
                            console.log(error);
                            // Alert.alert("Login Error", resp.error?.message);
                        }
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 32 }}>
                    <Text
                        style={{ fontWeight: "500" }}
                        onPress={() => router.replace("/Login/")}
                    >
                        Click Here To Return To Sign In Page
                    </Text>
                </View>
                <View>
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
        marginTop: 25,
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