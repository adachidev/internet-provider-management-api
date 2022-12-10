pipeline {
  agent any
  stages{
    stage('Git Checkout'){
      steps{
        git credentialsId: 'git adachi.rodrigo@gmail.com', url: 'https://github.com/rodrigoadachi/ldfibra-tio-ms.git'
      }
    }
  }
}