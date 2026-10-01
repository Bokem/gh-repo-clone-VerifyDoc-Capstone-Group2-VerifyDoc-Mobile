import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleReset = () => {
		const trimmedEmail = email.trim();

		if (trimmedEmail === '') {
			setMessage('Enter your email address to continue.');
			return;
		}

		const emailLooksValid = trimmedEmail.includes('@') && trimmedEmail.includes('.');
		if (!emailLooksValid) {
			setMessage('Enter the email address associated with your account.');
			return;
		}
		setMessage('Reset instructions are ready to be sent once authentication is connected.');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
				<ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
					<View style={styles.content}>
						<View style={styles.header}>
							<Text style={styles.title}>Forgot your password</Text>
							<Text style={styles.subtitle}>
								Enter the email associated with your VerifyDoc account and we&apos;ll send you instructions to reset it.
							</Text>
						</View>

						<View style={styles.form}>
							<View style={styles.fieldGroup}>
								<Text style={styles.label}>Email</Text>
								<TextInput
									style={styles.input}
									value={email}
									onChangeText={setEmail}
									placeholder="Enter your email"
									placeholderTextColor="#8993A4"
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									autoComplete="email"
									returnKeyType="send"
									onSubmitEditing={handleReset}
								/>
							</View>

							<Pressable style={styles.resendButton} onPress={handleReset} accessibilityRole="button">
								<Text style={styles.resendButtonText}>Resend link</Text>
							</Pressable>
							{message ? <Text accessibilityRole="alert" style={styles.message}>{message}</Text> : null}

							<Link href="/login" asChild>
								<Pressable style={styles.backButton} accessibilityRole="link">
									<Text style={styles.backButtonText}>Back</Text>
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
	flex: { 
		flex: 1 
	},

	safeArea: { 
		flex: 1, 
		backgroundColor: '#FFFFFF' 
	},

	scrollContent: { 
		flexGrow: 1, 
		alignItems: 'center' 
	},

	content: { 
		width: '100%', 
		maxWidth: 480, 
		paddingHorizontal: 24, 
		paddingTop: 44, 
		paddingBottom: 32 
	},

	header: { 
		alignItems: 'center', 
		marginBottom: 28 
	},

	title: { 
		color: '#111827', 
		fontSize: 28, 
		lineHeight: 36, 
		fontWeight: '700', 
		textAlign: 'center' 
	},

	subtitle: { 
		color: '#667085', 
		fontSize: 15, 
		lineHeight: 22, 
		marginTop: 10, 
		textAlign: 'center' 
	},

	form: { 
		gap: 17 
	},

	fieldGroup: { 
		gap: 8 
	},

	label: { 
		color: '#344054', 
		fontSize: 14, 
		fontWeight: '600' 
	},
	
	input: { 
		height: 52, 
		borderWidth: 1, 
		borderColor: '#D0D5DD', 
		borderRadius: 8, 
		backgroundColor: '#FFFFFF', 
		paddingHorizontal: 14, 
		color: '#101828', 
		fontSize: 15 
	},
	
	resendButton: { 
		minHeight: 54, 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderRadius: 8, 
		backgroundColor: '#1769AA', 
		marginTop: 4 
	},
	
	resendButtonText: { 
		color: '#FFFFFF', 
		fontSize: 16, 
		fontWeight: '700' 
	},
	
	message: { 
		color: '#9A4B26', 
		fontSize: 13, 
		lineHeight: 19, 
		marginTop: -4 
	},
	
	backButton: { 
		minHeight: 54, 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderWidth: 1, 
		borderColor: '#1769AA', 
		borderRadius: 8, 
		backgroundColor: '#FFFFFF'
	 },
	
	backButtonText: { 
		color: '#1769AA', 
		fontSize: 15, 
		fontWeight: '600' 
	},
});
