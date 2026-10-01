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

export default function RegisterScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [message, setMessage] = useState('');

	const handleRegister = () => {
		if (!name.trim() || !email.trim() || !password || !confirmation) {
			setMessage('Complete each field to continue.');
			return;
		}
		const emailLooksValid = email.trim().includes('@') && email.trim().includes('.');
		if (!emailLooksValid) {
			setMessage('Enter a valid organization email address.');
			return;
		}
		if (password.length < 8) {
			setMessage('Use a password with at least 8 characters.');
			return;
		}
		if (password !== confirmation) {
			setMessage('Your passwords do not match.');
			return;
		}
		setMessage('Registration is ready for your authentication service to be connected.');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
				<ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
					<View style={styles.content}>
						<View style={styles.header}>
							<Text style={styles.title}>Create an organization account</Text>
							<Text style={styles.subtitle}>
								Register your organization to verify credentials shared with you.
							</Text>
						</View>

						<View style={styles.form}>
							<View style={styles.fieldGroup}>
								<Text style={styles.label}>Full name</Text>
								<View style={styles.inputRow}>
									<TextInput
										style={styles.input}
										value={name}
										onChangeText={setName}
										placeholder="John Doe"
										placeholderTextColor="#89958E"
										autoCapitalize="words"
										autoCorrect={false}
									/>
								</View>
							</View>

							<View style={styles.fieldGroup}>
								<Text style={styles.label}>Organization email</Text>
								<View style={styles.inputRow}>
									<TextInput
										style={styles.input}
										value={email}
										onChangeText={setEmail}
										placeholder="name@organization.com"
										placeholderTextColor="#89958E"
										keyboardType="email-address"
										autoCapitalize="none"
										autoCorrect={false}
									/>
								</View>
							</View>

							<View style={styles.fieldGroup}>
								<Text style={styles.label}>Password</Text>
								<View style={styles.inputRow}>
									<TextInput
										style={styles.input}
										value={password}
										onChangeText={setPassword}
										placeholder="********"
										placeholderTextColor="#89958E"
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										autoCorrect={false}
									/>
									<Pressable
										style={styles.eyeButton}
										onPress={() => setShowPassword(!showPassword)}
										accessibilityRole="button"
										accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
										<View style={styles.eyeIcon}>
											<View style={styles.eyePupil} />
										</View>
									</Pressable>
								</View>
							</View>

							<View style={styles.fieldGroup}>
								<Text style={styles.label}>Confirm password</Text>
								<View style={styles.inputRow}>
									<TextInput
										style={styles.input}
										value={confirmation}
										onChangeText={setConfirmation}
										placeholder="********"
										placeholderTextColor="#89958E"
										secureTextEntry={!showConfirmation}
										autoCapitalize="none"
										autoCorrect={false}
									/>
									<Pressable
										style={styles.eyeButton}
										onPress={() => setShowConfirmation(!showConfirmation)}
										accessibilityRole="button"
										accessibilityLabel={showConfirmation ? 'Hide password' : 'Show password'}>
										<View style={styles.eyeIcon}>
											<View style={styles.eyePupil} />
										</View>
									</Pressable>
								</View>
							</View>

							<Pressable style={styles.button} onPress={handleRegister} accessibilityRole="button">
								<Text style={styles.buttonText}>Continue</Text>
							</Pressable>
							{message ? <Text accessibilityRole="alert" style={styles.message}>{message}</Text> : null}

							<Link href="/login" asChild>
								<Pressable style={styles.backButton} accessibilityRole="link">
									<Text style={styles.backButtonText}>Back</Text>
								</Pressable>
							</Link>
						</View>

						<View style={styles.footer}>
							<Text style={styles.footerText}>Already have an account?</Text>
							<Link href="/login" asChild>
								<Pressable accessibilityRole="link"><Text style={styles.link}>Login</Text></Pressable>
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	safeArea: { flex: 1, 
		backgroundColor: '#FFFFFF'
	 },

	scrollContent: { 
		flexGrow: 1, 
		alignItems: 'center',
	},

	content: { 
		width: '100%',
		 maxWidth: 480, 
		 paddingHorizontal: 24,
		  paddingTop: 36, 
		  paddingBottom: 32 
		},

	header: { 
		marginBottom: 28
	 },

	title: { 
		color: '#111827', 
		fontSize: 28, 
		lineHeight: 35, 
		fontWeight: '700' 
	},

	subtitle: { 
		color: '#667085', 
		fontSize: 15,
		lineHeight: 22, 
		marginTop: 10 
	},

	form: { gap: 17
	},
	
	fieldGroup: { gap: 8
	 },
	
	label: { 
		color: '#344054', 
		fontSize: 14, 
		fontWeight: '600'
	 },

	inputRow: { 
		height: 52, 
		flexDirection: 'row', 
		alignItems: 'center', 
		borderWidth: 1, 
		borderColor: '#D0D5DD', 
		borderRadius: 15, 
		backgroundColor: '#FFFFFF', 
		paddingHorizontal: 14 
	},

	input: { 
		flex: 1, 
		height: '100%', 
		color: '#101828', 
		fontSize: 15 
	},

	eyeButton: { 
		width: 40, 
		height: 48, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},

	eyeIcon: { 
		width: 22, 
		height: 15, 
		borderWidth: 1.7, 
		borderColor: '#1769AA', 
		borderRadius: 10, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},

	eyePupil: { 
		width: 6, 
		height: 6, 
		borderRadius: 3, 
		backgroundColor: '#1769AA'
	 },

	button: { 
		minHeight: 54, 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderRadius: 8, 
		backgroundColor: '#1769AA', 
		marginTop: 4 
	},

	buttonText: { 
		color: '#FFFFFF', 
		fontSize: 15, 
		fontWeight: '700' 
	},

	message: { 
		color: '#6969ea', 
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

	footer: { 
		alignItems: 'center', 
		gap: 8, 
		marginTop: 30 
	},

	footerText: { 
		color: '#667085', 
		fontSize: 14 
	},
	
	link: { 
		color: '#1769AA', 
		fontSize: 14, 
		fontWeight: '700' 
	},
});
