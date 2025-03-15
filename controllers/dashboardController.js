const Request = require('../models/Request');
const User = require('../models/User');

/**
 * Get dashboard statistics
 * This controller fetches all the data needed for the admin dashboard:
 * - Total requests count
 * - Requests by status (pending, completed, in-progress)
 * - Requests by waste type
 * - Monthly requests data
 */
const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard statistics');
    
    // Get total requests count
    const totalRequests = await Request.countDocuments();
    
    // Get requests by status
    const pendingRequests = await Request.countDocuments({ status: 'Pending' });
    const completedRequests = await Request.countDocuments({ status: 'completed' });
    // For in-progress, we check if TakenBy is not "anyone"
    const inProgressRequests = await Request.countDocuments({ 
      status: 'Pending', 
      TakenBy: { $ne: 'anyone' } 
    });
    
    // Get requests by waste type
    const electronicRequests = await Request.countDocuments({ type: 'Other' }); // Using "Other" as electronic
    const plasticRequests = await Request.countDocuments({ type: 'Plastic' });
    const paperRequests = await Request.countDocuments({ type: 'Paper' });
    const metalRequests = await Request.countDocuments({ type: 'Metal' });
    const glassRequests = await Request.countDocuments({ type: 'Glass' });
    
    // Get monthly requests data
    // First, get all requests with their creation dates
    const allRequests = await Request.find({}, 'createdAt');
    
    // Initialize monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRequests = {};
    months.forEach(month => {
      monthlyRequests[month] = 0;
    });
    
    // Count requests by month
    allRequests.forEach(request => {
      const date = new Date(request.createdAt);
      const month = months[date.getMonth()];
      monthlyRequests[month]++;
    });
    
    // Prepare response data
    const dashboardData = {
      totalRequests,
      pendingRequests,
      completedRequests,
      inProgressRequests,
      wasteTypes: {
        electronic: electronicRequests,
        plastic: plasticRequests,
        paper: paperRequests,
        metal: metalRequests,
        glass: glassRequests,
        other: 0 // We're using "Other" as electronic, so this is 0
      },
      monthlyRequests
    };
    
    console.log('Dashboard data:', dashboardData);
    res.status(200).json(dashboardData);
  } catch (err) {
    console.error('Error fetching dashboard statistics:', err);
    res.status(500).json({ message: 'Error fetching dashboard statistics', error: err.message });
  }
};

module.exports = {
  getDashboardStats
}; 