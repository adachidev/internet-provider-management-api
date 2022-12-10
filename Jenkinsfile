pipeline {
  
  agent any
  
  environment {
    API_PORT="3002"
    LD_MONGO_USER="ldfibra"
    LD_MONGO_PASS="ldfibra"
    LD_MONGO_URL="191.252.201.33"
    LD_MONGO_PORT="27017"
    LD_MONGO_DB="ldfibra-tio"
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