import { config } from '../../config';

export const environment = {
    production: config.production,
    NODE_ENV: config.NODE_ENV,
    API_URL: config.API_URL,
    // Url de teste API_URL: 'http://104.131.99.239:5050/',
    GRANT_TYPE: config.GRANT_TYPE,
    CLIENT_SECRET: config.CLIENT_SECRET,
    // Hash de teste CLIENT_SECRET: 'g422Ugg1VaW9UcXaqrUKe6hJNb7tETtViB9AtY4X',
    CLIENT_ID:  config.CLIENT_ID,
    scope: config.scope,

    /*production: false,
    NODE_ENV: 'dev',
    API_URL: 'http://209.97.147.27:81/',
    // Url de teste API_URL: 'http://104.131.99.239:5050/',
    GRANT_TYPE: 'password',
    CLIENT_SECRET: 'j2N63IeAWEQme4FHcx7z9eQVX5ljVTBO27mp5nbe',
    // Chave de teste CLIENT_SECRET: 'g422Ugg1VaW9UcXaqrUKe6hJNb7tETtViB9AtY4X',
    CLIENT_ID:  2,
    scope: '*',*/
};
