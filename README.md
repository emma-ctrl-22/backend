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
   - **Build Command**: `npm ci`
   - **Start Command**: `node index.js`
   - **Plan**: Free

4. Add the following environment variables:
   - `NODE_VERSION`: 16.20.0
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render will automatically set this, but you can specify it)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `STREAM_API_KEY`: Your Stream API key (if using Stream)
   - `STREAM_API_SECRET`: Your Stream API secret (if using Stream)

5. Click "Create Web Service"

### Troubleshooting Deployment Issues

If you encounter issues with native modules like bcrypt:

1. Make sure you're using Node.js version 16.x (specified in package.json and .node-version)
2. The .npmrc file should have the necessary settings for permissions
3. Use `npm ci` instead of `npm install` for more reliable builds
4. If bcrypt still causes issues, consider using a pure JavaScript alternative like bcryptjs:
   ```
   npm uninstall bcrypt
   npm install bcryptjs
   ```
   Then update your code to use bcryptjs instead of bcrypt.

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