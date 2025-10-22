param azureWebAppServiceName string
param apiBaseUrl string
param webBaseUrl string
param firebaseApiKey string
param firebaseAuthDomain string
param firebaseDatabaseUrl string
param firebaseStorageBucket string
param firebaseProjectId string
param firebaseMessageSenderId string
param firebaseAppId string
param firebaseMeasurementId string
param googleMapApiKey string
param nodeEnv string

var appSettingsProperties = {
  // api and web url
  NEXT_PUBLIC_API_BASE_URL: apiBaseUrl
  NEXT_PUBLIC_SITE_URL: webBaseUrl

  // firebase configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: firebaseApiKey
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseAuthDomain
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: firebaseDatabaseUrl
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseProjectId
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseStorageBucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseMessageSenderId
  NEXT_PUBLIC_FIREBASE_APP_ID: firebaseAppId
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: firebaseMeasurementId
  NEXT_PUBLIC_GOOGLE_MAP_API_KEY: googleMapApiKey

  // Add Docker registry settings
  DOCKER_REGISTRY_SERVER_URL: 'https://fennecapp.azurecr.io' // ACR URL
  DOCKER_REGISTRY_SERVER_USERNAME: 'fennecapp' // ACR username (can be admin username or service principal username)
  DOCKER_REGISTRY_SERVER_PASSWORD: '5dKKWls6b/MFS24E/J7FI8mhqFPhiRZFWtJCbbPaf5+ACRC7gOen'
  nodeEnv: nodeEnv
}

resource existingAppService 'Microsoft.Web/sites@2022-03-01' existing = {
  name: azureWebAppServiceName
}

resource appServiceConfig 'Microsoft.Web/sites/config@2022-03-01' = {
  name: 'appsettings'
  parent: existingAppService
  properties: appSettingsProperties
}

output appServiceConfigOutput object = appServiceConfig.properties
