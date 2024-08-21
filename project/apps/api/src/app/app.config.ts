export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Blog = 'http://localhost:8000/api/posts',
  File = 'http://localhost:6000/api/files'
}

export enum HttpClientSettings {
  MaxRedirects = 5,
  Timeout = 3000
}
