var ENV = {
  build: {
    environment: 'production' // the default
  },
  
  if (deployTarget === 'staging') {
    ENV['s3-index'].bucket = 'app-staging.example.com';
  }

  if (deployTarget === 'travis') {
    ENV['travis'] = true
  }

  return ENV;
}