
const { getNetworkSources } = require("../services/networkSources.service");

async function listNetworkSources(req, res, next) {
  try {
    const sources = await getNetworkSources();

    res.status(200).json({
      success: true,
      count: sources.length,
      sources,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { listNetworkSources };
