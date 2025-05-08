# StudyBuds Project

## Overview

The **StudyBuds** project is designed to provide a seamless and efficient learning experience with a microservices-based architecture, leveraging **Node.js** for the frontend and Kubernetes for deployment. The project employs **Docker** for containerization, **GitHub Actions** for continuous integration and deployment (CI/CD), and **Argo CD** for GitOps-based deployments on **Amazon EKS** clusters.

This repository contains the infrastructure and configurations for **StudyBuds**, which includes three environments: **development (dev)**, **staging (stg)**, and **production (prod)**. The system utilizes **VPC Peering** for secure, private communication between isolated networks, **NGINX** for service proxying, and **AWS Secrets Manager** for secure secrets management. SSL certificates are managed by **Certbot**, and logs are aggregated using **LokiStack** for centralized monitoring and analysis.

## Project Structure

```studybuds/
├── studybuds-cicd/
│   └── cicd/
│       ├── dev/
│       │   ├── common/
│       │   │   ├── deployment.yaml
│       │   │   ├── ingress.yaml
│       │   │   ├── kustomization.yaml
│       │   │   └── pvc.yaml
│       │   ├── secrets/
│       │   │   ├── kustomization.yaml
│       │   │   └── secrets.yaml
│       │   ├── studybuds-ai-backend/
│       │   │   ├── deployment.yaml
│       │   │   └── kustomization.yaml
│       │   ├── studybuds-backend/
│       │   ├── studybuds-backend-v2/
│       │   │   ├── deployment.yaml
│       │   │   └── kustomization.yaml
│       │   └── studybuds-frontend-v2/
│       │       ├── apps.yaml
│       │       └── kustomization.yaml
│   └── prod/
│   └── stg/
│   └── kustomization.yaml
├── .bash_history
└── script.sh
```


### **studybuds-cicd/**
Contains all the configurations and scripts for the CI/CD pipeline and deployment across different environments.

- **dev/**: Contains Kubernetes configuration files for the development environment.
  - **common/**: Common configurations shared across all services in the environment.
  - **secrets/**: Contains secrets and environment-specific configurations for the dev environment.
  - **studybuds-frontend-v2/**, **studybuds-backend/**, **studybuds-backend-v2/**, **studybuds-ai-backend/**: Kubernetes deployment configurations for each service within the development environment.

- **stg/**: Contains configurations for the staging environment.
- **prod/**: Contains configurations for the production environment.

### **.bash_history**
A history file for command-line activities.

### **script.sh**
A bash script for various automation tasks in the project.

## Features and Architecture

- **Frontend**: Built using **Node.js**, containerized into Docker images, and deployed using Kubernetes on **Amazon EKS** clusters.
- **CI/CD Pipeline**: Configured in **GitHub Actions** for automated deployments to specific environments upon push to a corresponding branch.
- **Argo CD**: GitOps for deployment management, ensuring continuous and consistent application deployment.
- **EKS Clusters**: Three separate **EKS clusters** deployed for development, staging, and production environments.
- **VPC Peering**: Secure, cost-effective, and low-latency communication between isolated networks.
- **NGINX Reverse Proxy**: Configured to manage internal communication across services.
- **Secrets Management**: Sensitive information like passwords, API keys, and SSH keys are securely stored in **AWS Secrets Manager**.
- **SSL Certificates**: Managed using **Certbot** for secure communication.
- **Backup**: **Qdrant** data is backed up incrementally via a **bash script** scheduled to run every **Sunday evening** and stored in **Amazon S3**.
- **Slack Notifications**: Real-time feedback is provided via Slack notifications for every code push.
- **Centralized Logging**: Integrated **LokiStack** for log aggregation, providing a unified view of logs across all services and clusters.

## Deployment

### 1. **Set Up the Environment**

Ensure that the necessary tools are installed:

- **Docker**: For containerizing the Node.js frontend.
- **kubectl**: For interacting with Kubernetes.
- **AWS CLI**: For managing AWS services like EKS and Secrets Manager.
- **Argo CD**: For GitOps deployment and management of Kubernetes resources.

### 2. **CI/CD Pipeline Configuration**

- The **CI/CD pipeline** is defined using **GitHub Actions** and is configured to deploy changes to specific environments upon push to a corresponding branch.
- **Argo CD** manages the deployment, ensuring the latest application updates are automatically deployed to the Kubernetes clusters.

### 3. **Kubernetes Deployment**

- Deploy the application on **Amazon EKS** using Kubernetes configuration files located in the respective environment directories (`dev`, `stg`, `prod`).
- **NGINX** is set up as a reverse proxy to ensure secure communication across services.

### 4. **Secrets and Configuration Management**

- Sensitive credentials (API keys, passwords, etc.) are securely stored in **AWS Secrets Manager**.
- Non-sensitive data is stored in **ConfigMaps** and managed via **Kustomize** for Kubernetes.

### 5. **Backup Configuration**

- Incremental backups of **Qdrant** data are scheduled using **CronJobs** and stored securely in **Amazon S3**.

## Additional Notes

- This project follows best practices for secure cloud-native architecture, with emphasis on private networking, secret management, and continuous deployment.
- **LokiStack** for centralized logging provides visibility across all microservices, making it easier to track issues and monitor performance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
