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
};
