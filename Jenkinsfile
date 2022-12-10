pipeline {
  agent any
  stages {
    stage('git clone'){
      steps{
        echo 'git clone...'
        git branch: 'master',
          credentialsId: 'git adachi.rodrigo@gmail.com',
          url: 'https://github.com/rodrigoadachi/ldfibra-tio-ms.git'
        sh "ls -lat"
      }
    }
    stage('docker'){
      //environment {
      //   CREDENTIALS = credentials('node_8.12.1-alpine')
      // }
      steps {
        script {
          //-u $CREDENTIALS_USR -p $CREDENTIALS_PSW
          echo 'docker login...'
          sh 'docker login 191.252.201.33:4243'
          echo 'docker build...'
          sh 'docker build -t ldfibra/tio-ms:master .'
          echo 'docker stop old...'
          sh 'docker stop ldfibra-tio-ms'
          echo 'docker rm old...'
          sh 'docker rm ldfibra-tio-ms'
          echo 'docker rmi image old...'
          sh 'docker rmi ldfibra/tio-ms:current'
          echo 'docker tag...'
          sh 'docker tag ldfibra/tio-ms:master ldfibra/tio-ms:current'
          echo 'docker run...'
          sh 'docker run -d --name ldfibra-tio-ms -p 3333:3333 ldfibra/tio-ms:current'
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