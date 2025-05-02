import { mockServer } from './MockServer';

/**
 * Initialize the mock server when in development mode
 * This should be imported early in the application bootstrap process
 */
const initMockServer = () => {
  // Only initialize in development mode or when explicitly enabled
  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true' || process.env.NODE_ENV === 'development') {
    console.log('Initializing mock server...');
    mockServer.init();
    console.log('Mock server ready!');
  }
};

export default initMockServer; 