pipeline {
    agent any

    environment {
        IMAGE_NAME = 'petsos-web-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"  // Unique tag for each build
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Stop Existing Container') {
            steps {
                // Stop and remove any existing container with the same name
                sh '''
                    if [ $(docker ps -q -f name=${IMAGE_NAME}) ]; then
                        docker stop ${IMAGE_NAME}
                        docker rm ${IMAGE_NAME}
                    fi
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                // Pull environment variables from Jenkins credentials
                withCredentials([
                    string(credentialsId: 'database-url', variable: 'DATABASE_URL'),
                    string(credentialsId: 'nextauth-secret', variable: 'NEXTAUTH_SECRET'),
                    string(credentialsId: 'nextauth-url', variable: 'NEXTAUTH_URL'),
                    string(credentialsId: 'google-client-id', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'google-client-secret', variable: 'GOOGLE_CLIENT_SECRET')
                ]) {
                    sh """
                        docker run -d \
                            --name ${IMAGE_NAME} \
                            -p 3000:3000 \
                            -e DATABASE_URL=$DATABASE_URL \
                            -e NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
                            -e NEXTAUTH_URL=$NEXTAUTH_URL \
                            -e GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
                            -e GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
                            ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success { echo "Docker container started successfully!" }
        failure { echo "Docker build or run failed!" }
    }
}
