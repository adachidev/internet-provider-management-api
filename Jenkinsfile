pipeline {
  
  agent any
  
  stages {
    
    stage('Build Image'){
      steps{
        script {
          echo 'Build Image...'          
          dockerapp = docker.build("ldfibra/tio-ms", '-f ./Dockerfile ./src')
        }
      }
    }
  }
}