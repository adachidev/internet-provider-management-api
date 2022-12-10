pipeline {
  
  agent any
  
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
        sh 'docker run -p 3002:3333 --name ldfibra-tio-ms --restart=unless-stopped -d ldfibra-tio-ms:latest'
      }
    }

  }
}