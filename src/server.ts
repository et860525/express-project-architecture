import { App } from './app';
import { DefaultException } from './exceptions/default.exception';

const runServer = () => {
	const app = new App();
	app.setException(DefaultException);
	app.runServer();
};

runServer();