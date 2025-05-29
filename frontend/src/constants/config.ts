const ENV = {
  dev: {
    API_URL: 'https://dev-api.example.com',
  },
  staging: {  
    API_URL: 'https://staging-api.example.com',
  },
  prod: {
    API_URL: 'https://api.example.com',
  },
};

const getEnvVars = () => {
  // Logic to determine current environment
  // and return corresponding config object
  
  return ENV.dev;
};

export const { API_URL } = getEnvVars();