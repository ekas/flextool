import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Flextool API',
    description: 'The Flextool API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '50m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  // You can also use any other email sending services
  mail: {
    service: {
      host: process.env.MAIL_SENDER_HOST,
      port: 587,
      secure: false,
      user: process.env.MAIL_SENDER_USER,
      pass: process.env.MAIL_SENDER_PASS,
    },
    senderCredentials: {
      name: process.env.MAIL_SENDER_NAME,
      email: process.env.MAIL_SENDER_EMAIL,
    },
  },
  // these are used in the mail templates
  project: {
    name: 'FlexTool',
    address: '__YOUR_PROJECT_ADDRESS__',
    logoUrl:
      'https://flextool-l34b4hwpz-ekas.vercel.app/static/media/logo.fe0850276f4cbebbb826c23deaac7f45.svg',
    slogan: 'Build your own tool',
    color: '#123456',
    socials: [
      ['GitHub', 'https://github.com/ekas/flextool'],
      ['Twitter', 'https://twitter.com/ekaspreet93'],
      ['LinkedIn', 'https://www.linkedin.com/in/ekaspreetsingh/'],
    ],
    url: 'https://flextool-ekas.vercel.app/',
    mailVerificationUrl: 'https://flextool-ekas.vercel.app//auth/verify',
    mailChangeUrl: 'https://flextool-ekas.vercel.app//auth/change-email',
    resetPasswordUrl: 'https://flextool-ekas.vercel.app//reset-password',
    termsOfServiceUrl: 'https://flextool-ekas.vercel.app//legal/terms',
  },
};

export default (): Config => config;
