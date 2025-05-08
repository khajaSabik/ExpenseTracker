Our application uses a complete automation pipeline featuring:
- GitHub Actions CI/CD workflows
- ArgoCD for Kubernetes GitOps deployments
- Nginx reverse proxy with Certbot-managed SSL
- Automated Qdrant database backups to S3
- Slack notifications for deployment events

## Architecture Overview
studybuds/
├── studybuds-cicd/ # CI/CD and Kubernetes configurations
│ └── cicd/
│ ├── dev/ # Development environment
│ │ ├── common/ # Shared resources
│ │ ├── secrets/ # Secret management
│ │ └── [services] # Component deployments
│ ├── prod/ # Production environment
│ └── stg/ # Staging environment
├── .github/workflows/ # GitHub Actions definitions
└── scripts/ # Maintenance scripts



## Automation Pipeline

### 1. CI/CD with GitHub Actions
- **Trigger**: On every push to main branch
- **Stages**:
  1. Test: Run unit and integration tests
  2. Build: Create Docker container images
  3. Deploy: Trigger ArgoCD sync
- **Artifacts**: Versioned container images in registry

### 2. GitOps Deployment with ArgoCD
- **Synchronization**: Auto-syncs Kubernetes cluster with manifests in this repo
- **Environments**:
  - Development (immediate sync)
  - Staging (manual approval)
  - Production (manual approval with checks)
- **Monitoring**: Visual deployment history and health status

### 3. Infrastructure Components
- **Nginx Proxy**:
  - Routes traffic to appropriate services
  - Terminates SSL connections
- **Certbot**:
  - Automated SSL certificate management
  - Auto-renewal before expiration

### 4. Data Management
- **Qdrant Backups**:
  - Weekly backups (Sunday 8 PM UTC)
  - Compressed and encrypted S3 storage
  - Retention policy: 30 days
- **Backup Verification**:
  - Monthly test restores
  - Size growth monitoring

## Notification System
- **Slack Alerts** for:
  - Deployment successes/failures
  - Backup completion
  - Certificate renewal
- **Channels**:
  - #deployments - CI/CD events
  - #alerts - System warnings

## Environment Configurations

| Environment | Auto-Deploy | Approval | Scale  | Access       |
|-------------|-------------|----------|--------|--------------|
| Dev         | ✓           | -        | 1-2    | All engineers|
| Staging     | -           | ✓        | 2-3    | QA team      |
| Production  | -           | ✓✓       | 5+     | DevOps       |

## Maintenance Procedures

### Regular Checks
1. **Certificate Status**: Monthly verification
2. **Backup Integrity**: Test restore quarterly
3. **Pipeline Health**: Weekly workflow review

### Recovery Processes
- **Failed Deployment**: Rollback via ArgoCD history
- **Backup Restoration**: Use `restore-qdrant.sh` script
- **SSL Issues**: Re-run Certbot validation

## Getting Started

### For Developers
1. Push to feature branches for testing
2. Merge to main triggers deployment pipeline
3. Monitor Slack for deployment status

### For Operations
1. Review ArgoCD dashboard before production promotions
2. Verify backup completion every Monday
3. Respond to Slack alerts within SLA

## Security
- Secrets encrypted in storage
- Minimal production access
- Audit logs for all deployments
