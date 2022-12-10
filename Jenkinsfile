pipeline {
  
  agent any
  
  stages {
    
    stage('Build docker Image'){
      steps{
        script {
          echo '....... Build docker Image .......'
          dockerapp = docker.build("ldfibra/tio-ms:${env.BUILD_ID}", '-f ./Dockerfile ./')
        }
      }
    }

    stage('Deploy App'){
      steps{
        echo '....... Deploy App .......'
        sh 'docker run -p 3002:3333 --name ldfibra/tio-ms -d ldfibra/tio-ms'
      }
    }

  }
}