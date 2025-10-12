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
                // Load environment variables from .env file
                sh 'export $(grep -v "^#" .env | xargs)'

                // Run container with ports and env vars
                sh """
                    docker run -d \
                        --name ${IMAGE_NAME} \
                        -p 3000:3000 \
                        --env-file .env \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        success { echo "Docker container started successfully!" }
        failure { echo "Docker build or run failed!" }
    }
}
