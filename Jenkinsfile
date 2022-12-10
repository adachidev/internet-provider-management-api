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

    stage('Checkout code') {
      steps {
          checkout scm
      }
    }
    // stage('build') {
    //   steps{
    //     echo 'build...'
    //     docker {
    //       image 'node:alpine'
    //     }
    //   }
    // }
    // stage('docker') {
    //   steps{
    //     echo 'docker image...'
    //     docker {
    //       image 'node:alpine'
    //     }
    //   }
    // }
    // stage('build') {
    //   steps{
    //     echo 'docker build...'
    //     docker.image('node:alpine').inside { c ->
    //       echo 'Building..'
    //       sh 'npm install'
    //       echo 'Run..'
    //       sh 'npm run start:prod'
    //       sh "docker logs ${c.id}"
    //     }
    //   }
    // }
  }
}