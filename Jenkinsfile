// ```groovy
// pipeline {

//     agent any

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Environment') {
//             steps {
//                 bat 'node --version'
//                 bat 'npm --version'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm ci'
//             }
//         }

//         stage('Lint') {
//             steps {
//                 bat 'npm run lint'
//             }
//         }

//         stage('Typecheck') {
//             steps {
//                 bat 'npx tsc --noEmit'
//             }
//         }

//         stage('Install Playwright Browsers') {
//             steps {
//                 bat 'npx playwright install chromium'
//             }
//         }

//         stage('Run Playwright Tests') {
//             steps {
//                 catchError(
//                     buildResult: 'FAILURE',
//                     stageResult: 'FAILURE'
//                 ) {
//                     bat 'npx playwright test'
//                 }
//             }
//         }
//     }

//     post {

//         always {

//             junit(
//                 testResults: 'test-results/junit-results.xml',
//                 allowEmptyResults: true
//             )

//             publishHTML([
//                 allowMissing: true,
//                 alwaysLinkToLastBuild: true,
//                 keepAll: true,
//                 reportDir: 'playwright-report',
//                 reportFiles: 'index.html',
//                 reportName: 'Playwright HTML Report'
//             ])

//             archiveArtifacts(
//                 artifacts: 'test-results/**/*',
//                 allowEmptyArchive: true,
//                 fingerprint: true
//             )
//         }
//     }
// }
// ```


pipeline {

    agent any

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('TypeScript Check') {
            steps {
                sh 'npm run typecheck'
            }
        }

        stage('Smoke Tests') {
            steps {
                sh 'npm run test:smoke'
            }
        }
    }

    post {

        always {
            junit(
                allowEmptyResults: true,
                testResults: 'test-results/results.xml'
            )

            archiveArtifacts(
                artifacts: 'playwright-report/**/*,test-results/**/*',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Fast CI passed'
        }

        failure {
            echo 'Fast CI failed'
        }
    }
}