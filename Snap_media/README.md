This project uses Appwrite as the backend service. All sensitive IDs (e.g., API keys, project IDs) have been removed to ensure the security of sensitive information, especially for public repositories like GitHub.

Adding Your Own Appwrite IDs
To run this project, you’ll need to configure it with your own Appwrite credentials. Follow these steps:

Create an Appwrite Project: Go to your Appwrite console, create a new project, and note the project ID.

Add Required Services: Set up the necessary databases, authentication, storage, and other services used in this project. For each service, take note of any required IDs, keys, or endpoints.

Update Environment Variables: Replace the missing IDs and keys in the project environment file or configuration file. For example:

Project ID
Database ID
Collection IDs

Local Testing: Once you've configured the project with your Appwrite credentials, test the setup locally before deploying to ensure everything is working correctly.