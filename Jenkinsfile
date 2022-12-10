pipeline {
  agent { dockerfile true }
  stages {
    stage('build'){
      steps{
        echo 'clone git...'
        git credentialsId: 'git adachi.rodrigo@gmail.com', url: 'https://github.com/rodrigoadachi/ldfibra-tio-ms.git'
      }
    }
    stage('run') {
      steps{
        echo 'run...'
        sh 'npm run start:prod'
      }
    }
  }
}