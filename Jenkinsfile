pipeline {
  agent any
  stages {
    stage('git clone'){
      steps{
        echo 'git clone...'
        git credentialsId: 'git adachi.rodrigo@gmail.com', url: 'https://github.com/rodrigoadachi/ldfibra-tio-ms.git'
      }
    }
    stage('build') {
      steps{
        echo 'build...'
        docker {
          image 'node:alpine'
        }
      }
    }
    stage('docker') {
      steps{
        echo 'docker image...'
        docker {
          image 'node:alpine'
        }
      }
    }
    stage('build') {
      steps{
        echo 'docker build...'
        docker.image('node:alpine').inside { c ->
          echo 'Building..'
          sh 'npm install'
          echo 'Run..'
          sh 'npm run start:prod'
          sh "docker logs ${c.id}"
        }
      }
    }
  }
}