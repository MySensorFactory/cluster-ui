import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { KeycloakInterface } from './KeycloakInterface';
import { DashboardConfig, Event, SensorValue, ValueConfig, ChartConfig } from './HomeClient';
import { Config, DataSource, SensorLabel, LabeledValue, TimeRangeOption } from './ConfigClient';
import { GetReportListResponse, ReportPreview, GetReportDetailsResponse, UpsertReportResponse, TimeRange, SensorData } from './ReportsClient';

// Mock data
const mockToken = 'mock-jwt-token';
const mockRefreshToken = 'mock-refresh-token';

// Mock user
const mockUser = {
  id: 'user-123',
  username: 'test-user',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  roles: ['user', 'viewer', 'admin', 'manager', 'analyst', 'reporter', 'system-user', 'cluster-user', 'DATA_ACCESSOR', 'ADMIN']
};

// Mock Home API data
const mockEvents = [
  new Event('Machine 1 Temperature Warning', Date.now() - 3600000, true),
  new Event('Daily Maintenance Complete', Date.now() - 7200000, false),
  new Event('Production Line 3 Started', Date.now() - 10800000, false),
];

const mockCurrentSensorValues = [
  new SensorValue('temp-1', 'Temperature 1', 'temperature', Date.now(), { value: 72.5, min: 65, max: 85 }),
  new SensorValue('press-1', 'Pressure 1', 'pressure', Date.now(), { value: 2.4, min: 1.5, max: 3.0 }),
  new SensorValue('hum-1', 'Humidity 1', 'humidity', Date.now(), { value: 45, min: 30, max: 60 }),
];

const mockAverageSensorValues = [
  new SensorValue('temp-1', 'Temperature 1', 'temperature', Date.now(), { value: 74.2, min: 68, max: 82 }),
  new SensorValue('press-1', 'Pressure 1', 'pressure', Date.now(), { value: 2.2, min: 1.8, max: 2.8 }),
  new SensorValue('hum-1', 'Humidity 1', 'humidity', Date.now(), { value: 42, min: 35, max: 55 }),
];

const mockChartData = {
  'temp-1': [...Array(24).keys()].map(hour => {
    const timestamp = Date.now() - hour * 3600000;
    return new SensorValue('temp-1', 'Temperature 1', 'temperature', timestamp, { value: 70 + Math.random() * 10 });
  }),
  'press-1': [...Array(24).keys()].map(hour => {
    const timestamp = Date.now() - hour * 3600000;
    return new SensorValue('press-1', 'Pressure 1', 'pressure', timestamp, { value: 2 + Math.random() });
  }),
};

const mockDashboardConfig = new DashboardConfig(
  'test-user',
  [
    new ValueConfig('temp-1', 'Temperature 1', 'temperature'),
    new ValueConfig('press-1', 'Pressure 1', 'pressure'),
  ],
  [
    new ValueConfig('temp-1', 'Temperature 1', 'temperature'),
    new ValueConfig('hum-1', 'Humidity 1', 'humidity'),
  ],
  [
    new ChartConfig('temp-1', 'Temperature 1', 'temperature'),
    new ChartConfig('press-1', 'Pressure 1', 'pressure'),
  ]
);

// Mock Config API data
const mockConfig = new Config(
  {
    'temperature': new DataSource('temperature', 'Temperature', [
      new SensorLabel('temp-1', 'Temperature 1'),
      new SensorLabel('temp-2', 'Temperature 2'),
    ]),
    'pressure': new DataSource('pressure', 'Pressure', [
      new SensorLabel('press-1', 'Pressure 1'),
      new SensorLabel('press-2', 'Pressure 2'),
    ]),
    'humidity': new DataSource('humidity', 'Humidity', [
      new SensorLabel('hum-1', 'Humidity 1'),
      new SensorLabel('hum-2', 'Humidity 2'),
    ]),
  },
  [
    new LabeledValue('name', 'Name'),
    new LabeledValue('date', 'Date'),
  ],
  [
    new TimeRangeOption('1d', 'Last 24 Hours', 1),
    new TimeRangeOption('7d', 'Last Week', 7),
    new TimeRangeOption('30d', 'Last Month', 30),
  ],
  {
    'temperature': { 'value': '°C', 'min': '°C', 'max': '°C' },
    'pressure': { 'value': 'bar', 'min': 'bar', 'max': 'bar' },
    'humidity': { 'value': '%', 'min': '%', 'max': '%' },
  },
  ['temperature', 'pressure']
);

// Mock Reports API data
const mockReports = [
  {
    id: 'report-1',
    name: 'Daily Temperature Report',
    description: 'Temperature readings for the past 24 hours',
    label: 'temperature',
    sensorLabels: {
      'temperature': ['temp-1', 'temp-2']
    },
    timeRange: new TimeRange(Date.now() - 86400000, Date.now()),
    dataBySensorType: {
      'temperature': {
        'temp-1': [...Array(24).keys()].map(hour => {
          const timestamp = Date.now() - hour * 3600000;
          return new SensorData(timestamp, { value: 70 + Math.random() * 10 });
        }),
        'temp-2': [...Array(24).keys()].map(hour => {
          const timestamp = Date.now() - hour * 3600000;
          return new SensorData(timestamp, { value: 75 + Math.random() * 8 });
        }),
      }
    }
  },
  {
    id: 'report-2',
    name: 'Weekly Pressure Report',
    description: 'Pressure readings for the past week',
    label: 'pressure',
    sensorLabels: {
      'pressure': ['press-1']
    },
    timeRange: new TimeRange(Date.now() - 604800000, Date.now()),
    dataBySensorType: {
      'pressure': {
        'press-1': [...Array(24).keys()].map(hour => {
          const timestamp = Date.now() - hour * 3600000;
          return new SensorData(timestamp, { value: 2 + Math.random() });
        }),
      }
    }
  }
];

// Mock Keycloak
const mockKeycloak = () => {
  // Override the real KeycloakInterface with mock implementation
  KeycloakInterface.initKeycloak = (onAuthenticatedCallback) => {
    console.log('Mock Keycloak initialized');
    // Simulate success and call the callback right away
    setTimeout(() => {
      onAuthenticatedCallback();
    }, 500);
  };

  KeycloakInterface.doLogin = () => {
    console.log('Mock login called');
    return Promise.resolve();
  };

  KeycloakInterface.doLogout = () => {
    console.log('Mock logout called');
    return Promise.resolve();
  };

  KeycloakInterface.getToken = () => {
    return mockToken;
  };

  KeycloakInterface.getTokenParsed = () => {
    return {
      preferred_username: mockUser.username,
      name: `${mockUser.firstName} ${mockUser.lastName}`,
      email: mockUser.email,
      realm_access: {
        roles: mockUser.roles
      }
    };
  };

  KeycloakInterface.isLoggedIn = () => {
    return true;
  };

  KeycloakInterface.updateToken = (callback) => {
    return Promise.resolve(callback());
  };

  KeycloakInterface.clearToken = () => {
    console.log('Mock clear token called');
  };

  KeycloakInterface.getUsername = () => {
    return mockUser.username;
  };

  KeycloakInterface.hasRole = (roles) => {
    console.log('Role check requested for:', roles);
    // Check each role individually and log it
    if (Array.isArray(roles)) {
      roles.forEach(role => {
        const hasRole = mockUser.roles.includes(role);
        console.log(`Checking for role '${role}': ${hasRole ? 'FOUND' : 'NOT FOUND'}`);
      });
    } else if (typeof roles === 'string') {
      const hasRole = mockUser.roles.includes(roles);
      console.log(`Checking for single role '${roles}': ${hasRole ? 'FOUND' : 'NOT FOUND'}`);
    }
    
    const hasRequiredRole = Array.isArray(roles) 
      ? roles.some(role => mockUser.roles.includes(role))
      : mockUser.roles.includes(roles);
    
    console.log('Has required role:', hasRequiredRole);
    return hasRequiredRole;
  };
};

// Mock server implementation
export class MockServer {
  constructor() {
    this.mock = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      return;
    }

    console.log('Starting mock server initialization...');
    
    // Initialize mock Keycloak
    mockKeycloak();
    console.log('Mock Keycloak initialized with roles:', mockUser.roles);

    // Create mock adapter
    this.mock = new MockAdapter(axios);
    
    // Add debug endpoint
    this.setupDebugEndpoints();
    
    // Setup main API mocks
    this.setupHomeApiMocks();
    this.setupConfigApiMocks();
    this.setupReportsApiMocks();

    this.initialized = true;
    console.log('Mock server fully initialized');
  }
  
  setupDebugEndpoints() {
    // Debug endpoint to check if mock server is running
    this.mock.onGet('/api/debug/status').reply(200, {
      status: 'Mock server is running',
      mockUserRoles: mockUser.roles,
      mockToken: mockToken.substring(0, 10) + '...',
      timestamp: new Date().toISOString()
    });
    
    // Debug endpoint to test role checking
    this.mock.onGet('/api/debug/check-role').reply((config) => {
      const role = config.params?.role;
      if (!role) {
        return [400, { error: 'No role provided' }];
      }
      
      const hasRole = mockUser.roles.includes(role);
      return [200, { 
        role,
        hasRole,
        allRoles: mockUser.roles
      }];
    });
  }

  setupHomeApiMocks() {
    // Mock Home API endpoints
    const homeApiBaseUrl = process.env.REACT_APP_HOME_API_BASE_URL || '';
    
    // GET /events
    this.mock.onGet(`${homeApiBaseUrl}/events`).reply((config) => {
      console.log('Mock: GET /events', config.params);
      let filteredEvents = [...mockEvents];
      
      // Apply filtering based on params
      if (config.params) {
        if (config.params.showOnlyAlerts) {
          filteredEvents = filteredEvents.filter(e => e.isAlert);
        }
        if (config.params.searchTerm) {
          const searchTerm = config.params.searchTerm.toLowerCase();
          filteredEvents = filteredEvents.filter(e => e.title.toLowerCase().includes(searchTerm));
        }
      }
      
      return [200, filteredEvents];
    });
    
    // GET /sensor-values/:id
    this.mock.onGet(new RegExp(`${homeApiBaseUrl}/sensor-values/.*`)).reply(200, mockCurrentSensorValues);
    
    // GET /average-sensor-values/:id
    this.mock.onGet(new RegExp(`${homeApiBaseUrl}/average-sensor-values/.*`)).reply(200, mockAverageSensorValues);
    
    // GET /chart-data
    this.mock.onGet(`${homeApiBaseUrl}/chart-data`).reply(200, mockChartData);
    
    // GET /dashboard-config/:id
    this.mock.onGet(new RegExp(`${homeApiBaseUrl}/dashboard-config/.*`)).reply(200, mockDashboardConfig);
    
    // PUT /dashboard-config/:id
    this.mock.onPut(new RegExp(`${homeApiBaseUrl}/dashboard-config/.*`)).reply((config) => {
      const updatedConfig = JSON.parse(config.data);
      // In a real implementation, you would update the stored config here
      return [200, updatedConfig];
    });
  }

  setupConfigApiMocks() {
    // Mock Config API endpoints
    const configApiBaseUrl = process.env.REACT_APP_CONFIG_API_BASE_URL || '';
    
    // GET /config
    this.mock.onGet(`${configApiBaseUrl}/config`).reply(200, mockConfig);
  }

  setupReportsApiMocks() {
    // Mock Reports API endpoints
    const reportsApiBaseUrl = process.env.REACT_APP_REPORTS_API_BASE_URL || '';
    
    // POST /reports
    this.mock.onPost(`${reportsApiBaseUrl}/reports`).reply((config) => {
      const reportData = JSON.parse(config.data);
      const newReport = {
        id: `report-${mockReports.length + 1}`,
        ...reportData
      };
      mockReports.push(newReport);
      return [201, new UpsertReportResponse(newReport.id)];
    });
    
    // POST /reports/search
    this.mock.onPost(`${reportsApiBaseUrl}/reports/search`).reply((config) => {
      const searchRequest = JSON.parse(config.data);
      let filteredReports = [...mockReports];
      
      // Apply filtering if specified
      if (searchRequest.filter) {
        if (searchRequest.filter.textQuery) {
          const query = searchRequest.filter.textQuery.toLowerCase();
          filteredReports = filteredReports.filter(r => 
            r.name.toLowerCase().includes(query) || 
            r.description.toLowerCase().includes(query)
          );
        }
        
        if (searchRequest.filter.sensorTypes && searchRequest.filter.sensorTypes.length > 0) {
          filteredReports = filteredReports.filter(r => 
            Object.keys(r.sensorLabels).some(type => 
              searchRequest.filter.sensorTypes.includes(type)
            )
          );
        }
        
        // Additional filtering logic can be added here
      }
      
      // Create response
      const response = new GetReportListResponse(
        filteredReports.map(r => new ReportPreview(
          r.id,
          r.name,
          r.sensorLabels,
          r.timeRange
        )),
        filteredReports.length
      );
      
      return [200, response];
    });
    
    // GET /reports/:id
    this.mock.onGet(new RegExp(`${reportsApiBaseUrl}/reports/.*`)).reply((config) => {
      const id = config.url.split('/').pop();
      const report = mockReports.find(r => r.id === id);
      
      if (report) {
        return [200, report];
      } else {
        return [404, { message: 'Report not found' }];
      }
    });
    
    // PATCH /reports/:id
    this.mock.onPatch(new RegExp(`${reportsApiBaseUrl}/reports/.*`)).reply((config) => {
      const id = config.url.split('/').pop();
      const updateData = JSON.parse(config.data);
      const reportIndex = mockReports.findIndex(r => r.id === id);
      
      if (reportIndex !== -1) {
        mockReports[reportIndex] = {
          ...mockReports[reportIndex],
          ...updateData
        };
        return [200, new UpsertReportResponse(id)];
      } else {
        return [404, { message: 'Report not found' }];
      }
    });
    
    // DELETE /reports/:id
    this.mock.onDelete(new RegExp(`${reportsApiBaseUrl}/reports/.*`)).reply((config) => {
      const id = config.url.split('/').pop();
      const reportIndex = mockReports.findIndex(r => r.id === id);
      
      if (reportIndex !== -1) {
        mockReports.splice(reportIndex, 1);
        return [204];
      } else {
        return [404, { message: 'Report not found' }];
      }
    });
  }
}

export const mockServer = new MockServer(); 