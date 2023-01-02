pipeline {
  
  agent any
  
  environment {
    API_PORT="3002"
    MONGO_USER="ldfibra"
    MONGO_PASS="ldfibra"
    MONGO_URL="191.252.201.33"
    MONGO_PORT="27017"
    MONGO_DB="ldfibra-tio"
    WA_URL="http://191.252.201.33:3000"
    WA_PASS="LdF!br@2022"
  }

  stages {
    
    stage('Build docker Image'){
      steps{
        script {
          echo '....... Build docker Image .......'
          dockerapp = docker.build("ldfibra-tio-ms:latest", '-f ./Dockerfile ./')
        }
      }
    }

    stage('Destroy Existing Container'){
      steps{
        script {
          echo '....... Destroy Existing Container .......'
          sh 'docker rm -f ldfibra-tio-ms'
        }
      }
    }

    stage('Deploy App'){
      steps{
        echo '....... Deploy App .......'
        sh 'docker run -p 3002:3002 --name ldfibra-tio-ms --restart=unless-stopped -d ldfibra-tio-ms:latest'
      }
    }

  }
}