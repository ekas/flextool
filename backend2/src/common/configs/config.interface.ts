export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
  mail: MailConfig;
  project: ProjectConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface MailConfig {
  service: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  senderCredentials: {
    name: string;
    email: string;
  };
}

export interface ProjectConfig {
  name: string;
  address: string;
  logoUrl: string;
  slogan: string;
  color: string;
  socials: [string[], string[], string[]];
  url: string;
  mailVerificationUrl: string;
  mailChangeUrl: string;
  resetPasswordUrl: string;
  termsOfServiceUrl: string;
}
