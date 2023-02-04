pipeline {
  
  agent any
  
  environment {
    API_PORT="3002"
    MONGO_USER="ldfibra"
    MONGO_PASS="L4ng0D1g1t4l"
    MONGO_URL="mongodb"
    MONGO_PORT="27017"
    MONGO_DB="ldfibra-tio"
    WA_URL="http://172.16.8.5:3000"
    WA_PASS="LdF!br@2022"
    GERNET_API="https://api-pix-h.gerencianet.com.br"
    GERNET_CLIENT_ID="Client_Id_f218688029becc399781622d6d39b1b333820d1f"
    GERNET_CLIENT_SECRET="Client_Secret_21f67dc3f3b8e8cc83cb24b02c3375d21898beb5"
    GERNET_CERT="homologacao-70759-ldfibra-tio-ms-homolog.p12"
    NODEVERSION="18.13.0"
  }

  stages {
    
    stage('Build docker Image'){
      steps{
        script {
          echo '....... Build docker Image .......'
          dockerapp = docker.build("ldfibra-tio-ms:${env.BUILD_ID}", '-f ./Dockerfile ./')
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
        sh "docker run -p 3002:3002 --name ldfibra-tio-ms --restart=unless-stopped -d ldfibra-tio-ms:${env.BUILD_ID}"
      }
    }

  }
  
  post {
    success {
      mail to: 'adachi.rodrigo@gmail.com', subject: 'Pipeline success', body: "${env.BUILD_URL}"
    }
		failure {
			mail to: 'adachi.rodrigo@gmail.com', subject: 'Pipeline failed', body: "${env.BUILD_URL}"
		}
	}
}