import * as Express from 'express';
import * as HTTP from 'http';
import * as OS from 'os';
import * as FS from 'fs';


const PORT: number = 9013;
const BASE_PATH: string = 'C:/users/' + OS.userInfo().username + '/OneDrive/colors.txt';
console.log(BASE_PATH);
class App {
    private httpServer: HTTP.Server;
    private expressApplication: Express.Application;
    private colorName: string = '';

    constructor() {
        this.startHTTPServer();
    }

    // #region HTTP Server
    private startHTTPServer(): void {
        console.log('Starting HTTP server...');

        this.expressApplication = Express();
        this.configureRoutes();

        HTTP.createServer(this.expressApplication);
        this.httpServer = this.expressApplication.listen(PORT);

        this.httpServer.on('error', (error: NodeJS.ErrnoException): void => { this.onHTTPServerError(error); });
        this.httpServer.on('listening', (): void => { console.log('Listening on port', PORT); });
    }

    private configureRoutes(): void {
        let router: Express.Router = Express.Router();

        router.get('*', (request: Express.Request, response: Express.Response, next: Express.NextFunction): void => {
            let colorNames: string[] = FS.readFileSync(BASE_PATH).toString().split('|');
            let colorName: string = colorNames.length > 1 ? colorNames[colorNames.length - 2] : 'black';

            if (colorName != this.colorName) {
                this.colorName = colorName;
                FS.writeFileSync(BASE_PATH, this.colorName + '|');
            }

            response.send(this.colorName);
        });

        this.expressApplication.use('/', router);
    }

    private onHTTPServerError(error: NodeJS.ErrnoException): void {
        if (error.syscall == 'listen') {
            switch (error.code) {
                case 'EACCES':
                    console.log('Error: port', PORT, 'requires elevated privileges');
                    break;
                case 'EADDRINUSE':
                    console.log('Error: port', PORT, 'is already in use');
                    break;
                default:
                    console.log(error);
                    break;
            }
        } else {
            console.log('Error:', error);
        }

        process.exit(1);
    }
    // #endregion
}

const app: App = new App(); // start the app
