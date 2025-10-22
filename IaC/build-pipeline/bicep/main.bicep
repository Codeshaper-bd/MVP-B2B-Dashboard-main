param azureWebAppServiceName string
param webApiBaseUrl string
param nodeEnv string
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

module ApiAppService 'modules/web.appservice.bicep' = {
  name: 'ApiAppServiceModule'
  params: {
    azureWebAppServiceName: azureWebAppServiceName
    apiBaseUrl: webApiBaseUrl
    nodeEnv: nodeEnv
    webBaseUrl: webBaseUrl
    firebaseApiKey: firebaseApiKey
    firebaseAuthDomain: firebaseAuthDomain
    firebaseDatabaseUrl: firebaseDatabaseUrl
    firebaseProjectId: firebaseProjectId
    firebaseStorageBucket: firebaseStorageBucket
    firebaseMessageSenderId: firebaseMessageSenderId
    firebaseAppId: firebaseAppId
    firebaseMeasurementId: firebaseMeasurementId
    googleMapApiKey: googleMapApiKey
  }
}
