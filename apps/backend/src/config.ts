export const CONFIG = {
  APP: {
    BASE_PATH: process.env.BASE_PATH ?? '',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    LOG_LEVEL: process.env.LOG_LEVEL ?? 'debug',
    PORT: !isNaN(+(process.env.PORT || '4000'))
      ? +(process.env.PORT || '4000')
      : 4000,
  },
  SWAGGER: { BASE_PATH: process.env.SWAGGER_BASE_PATH ?? '/swagger' },
};
