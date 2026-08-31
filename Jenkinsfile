pipeline {
    agent any

    // stages {

    //     stage('Checkout') {
    //         steps {
    //             checkout scm
    //         }
    //     }

        stage('Environment') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

stage('Install Playwright Browsers') {
    steps {
        bat 'npx playwright install chromium'
    }
}
        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}