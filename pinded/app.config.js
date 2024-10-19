// /pinded/app.config.js
import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_HOST: process.env.API_HOST,
    },
  };
};
