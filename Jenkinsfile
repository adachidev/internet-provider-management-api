pipeline {
  
  agent any
  
  stages {
    
    stage('Build Image'){
      steps{
        script {
          echo 'Build Image...'          
          dockerapp = docker.build("ldfibra/tio-ms:${env.BUILD_ID}", '-f ./Dockerfile ./')
        }
      }
    }

    // stage('Push Image'){
    //   steps{
    //     script {
    //       echo 'Push Image...'          
    //       docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
    //         dockerapp.push('latest')
    //         dockerapp.push("${env.BUILD_ID}")
    //       }
    //     }
    //   }
    // }


  }
}