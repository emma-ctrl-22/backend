# EcoHaul Backend

This is the backend API for the EcoHaul application, a platform for managing waste collection requests.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.sample`
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment to Render

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Name**: ecohaul-backend
   - **Environment**: Node
   - **Region**: Choose the region closest to your users
   - **Branch**: main (or your preferred branch)
   - **Build Command**: `npm install && npm rebuild bcrypt --build-from-source`
   - **Start Command**: `node index.js`
   - **Plan**: Free

4. Add the following environment variables:
   - `NODE_VERSION`: 16
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render will automatically set this, but you can specify it)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `STREAM_API_KEY`: Your Stream API key (if using Stream)
   - `STREAM_API_SECRET`: Your Stream API secret (if using Stream)

5. Click "Create Web Service"

### Automatic Deployment with render.yaml

If you have the `render.yaml` file in your repository, you can use Render Blueprints:

1. Go to the Render Dashboard
2. Click on "Blueprints" in the sidebar
3. Click "New Blueprint Instance"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file and set up the services
6. You'll need to manually add the secret environment variables

## API Endpoints

- `GET /health`: Health check endpoint
- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `POST /api/request`: Create a new request
- `GET /api/request/allrequests`: Get all requests
- `GET /api/request/userhistory`: Get requests by author
- `GET /api/request/byemail`: Get requests by email
- `GET /api/request/plastic`: Get plastic requests
- `GET /api/request/paper`: Get paper requests
- `POST /api/request/assigndriver`: Assign a driver to a request 