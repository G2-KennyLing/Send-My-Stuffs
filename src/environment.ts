enum Environments {
    Local_Environment = 'local',
    Dev_Environment = 'dev',
    Prod_Environment = 'prod',
    Qa_Environment = 'qa'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.Prod_Environment) {
            return 8081;
        } else if (this.environment === Environments.Dev_Environment) {
            return 8082;
        } else if (this.environment === Environments.Qa_Environment) {
            return 8083;
        } else {
            return 3000;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.Prod_Environment) {
            return 'send-my-stuffs';
        } else if (this.environment === Environments.Dev_Environment) {
            return 'send-my-stuffs';
        } else if (this.environment === Environments.Qa_Environment) {
            return 'send-my-stuffs';
        } else {
            return 'send-my-stuffs';
        }
    }
}

export default new Environment(Environments.Local_Environment);