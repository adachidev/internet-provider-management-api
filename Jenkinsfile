pipeline {
  agent { dockerfile true}
  stages{
    stage('Git Checkout'){
      steps{
        git credentialsId: 'git adachi.rodrigo@gmail.com', url: 'https://github.com/rodrigoadachi/ldfibra-tio-ms.git'
      }
    }
    stage('Build'){
      steps{
        sh 'node -v'
      }
    }
  }
}