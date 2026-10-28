
const eventsService = require("../services/events.service");
const { eventQuerySchema, createEventSchema } = require("../validators/events.schema");

async function getEvents(req, res, next) {
  try {
    const query = eventQuerySchema.parse(req.query);
    const result = await eventsService.getEvents(query);

    res.status(200).json({
      success: true,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
      count: result.events.length,
      events: result.events,
    });
  } catch (error) {
    next(error);
  }
}

async function createEvent(req, res, next) {
  try {
    const data = createEventSchema.parse(req.body);
    const event = await eventsService.createEvent(data);

    res.status(201).json({
      success: true,
      message: "Security event created successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEvents,
  createEvent,
};
