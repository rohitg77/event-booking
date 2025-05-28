const Event = require('../models/Event');


exports.createEvent = async (req, res) => {

  try {
    const event = await Event.create({ ...req.body, createdBy: req.user._id });


    res.status(201).json({ message: 'Event created', event });


  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};


// update Event..
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Event updated', event });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};



exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};





exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};
