export const TelegramProvider = {
	navigationStack: [] as string[],

	initializeApp: () => {
		const tg = window?.Telegram?.WebApp;

		if (tg) {
			tg.ready();
			tg.expand();
			tg.enableClosingConfirmation();
			tg.setBackgroundColor('#1b1b1b');
			tg.disableVerticalSwipes();
			tg.setHeaderColor('secondary_bg_color');
		}
	},

	setColor: (color: string) => {
		if (window?.Telegram?.WebApp) {
			window.Telegram.WebApp.setBackgroundColor(color);
		}
	},

	updateButton: (pathname: string, navigate: any) => {
		const tg = window?.Telegram?.WebApp;
		const backButton = tg?.BackButton;
		const excludedPaths: string[] = ['/', '/home'];

		if (excludedPaths.includes(pathname)) {
			TelegramProvider.navigationStack = [];
			backButton?.hide();
		} else {
			if (
				TelegramProvider.navigationStack[
					TelegramProvider.navigationStack.length - 1
				] !== pathname
			) {
				TelegramProvider.navigationStack.push(pathname);
			}

			backButton?.onClick(() => {
				TelegramProvider.navigationStack.pop();
				const prevPath = TelegramProvider.navigationStack.pop() || '/home';
				navigate(prevPath);
			});
			backButton?.show();
		}
	},

	biometricInit: () => {
		const biometricManager = window?.Telegram?.WebApp?.BiometricManager;
		if (biometricManager && !(TelegramProvider as any).biometricInited) {
			(TelegramProvider as any).biometricInited = true;
			window.Telegram.WebApp.onEvent('biometricManagerUpdated', () => {
				console.log('Biometric Manager Updated');
			});
			biometricManager.init();
		}
	},

	biometricRequestAccess: () => {
		const biometricManager = window?.Telegram?.WebApp?.BiometricManager;
		if (!biometricManager?.isInited) {
			console.warn('Biometric not inited yet!');
			return;
		}

		biometricManager.requestAccess(
			{ reason: 'The bot uses biometrics for testing purposes.' },
			(accessGranted: any) => {
				if (accessGranted) {
					console.log('Access granted');
				} else {
					console.warn('Access denied');
				}
			}
		);
	},

	biometricRequestAuth: () => {
		const biometricManager = window?.Telegram?.WebApp?.BiometricManager;
		if (!biometricManager?.isInited) {
			console.warn('Biometric not inited yet!');
			return;
		}

		biometricManager.authenticate(
			{ reason: 'The bot requests biometrics for testing purposes.' },
			(success: any, token: any) => {
				if (success) {
					console.log(`Authentication successful, token: ${token}`);
				} else {
					console.warn('Authentication failed');
				}
			}
		);
	},

	biometricSetToken: () => {
		const biometricManager = window?.Telegram?.WebApp?.BiometricManager;
		if (!biometricManager?.isInited) {
			console.warn('Biometric not inited yet!');
			return;
		}

		const token = parseInt(Math.random().toString().substring(2)).toString(16);
		biometricManager.updateBiometricToken(token, (updated: any) => {
			if (updated) {
				console.log(`Token updated: ${token}`);
			} else {
				console.warn('Failed to update token');
			}
		});
	},

	biometricRemoveToken: () => {
		const biometricManager = window?.Telegram?.WebApp?.BiometricManager;
		if (!biometricManager?.isInited) {
			console.warn('Biometric not inited yet!');
			return;
		}

		biometricManager.updateBiometricToken('', (updated: any) => {
			if (updated) {
				console.log('Token removed');
			} else {
				console.warn('Failed to remove token');
			}
		});
	},
};
