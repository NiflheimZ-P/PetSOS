pipeline {
    agent any

    environment {
        ENV_FILE = '.env'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Old Containers & Images') {
            steps {
                sh '''
                    echo "Stopping and removing old containers..."
                    docker ps -q --filter "name=petsos" | xargs -r docker stop
                    docker ps -aq --filter "name=petsos" | xargs -r docker rm

                    echo "Removing old images..."
                    docker images -q --filter=reference='petsos-*' | xargs -r docker rmi -f || true
                '''
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                withCredentials([
                    string(credentialsId: 'database-url', variable: 'DATABASE_URL'),
                    string(credentialsId: 'nextauth-secret', variable: 'NEXTAUTH_SECRET'),
                    string(credentialsId: 'nextauth-url', variable: 'NEXTAUTH_URL'),
                    string(credentialsId: 'google-client-id', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'google-client-secret', variable: 'GOOGLE_CLIENT_SECRET')
                ]) {
                    sh '''
                        # Export credentials for Docker Compose
                        export DATABASE_URL=$DATABASE_URL
                        export NEXTAUTH_SECRET=$NEXTAUTH_SECRET
                        export NEXTAUTH_URL=$NEXTAUTH_URL
                        export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
                        export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

                        # Build and deploy all services (app1, app2, HAProxy)
                        docker compose build
                        docker compose up -d
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo "HAProxy + Next.js instances deployed successfully!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
