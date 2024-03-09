const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/server-config");

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a notification from queue.",
        content: "Some quque will subscribe it.",
        recepientEmail: "kamal.neupane0817@gmail.com",
        notificationTime: "2024-03-09T09:49:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Succesfully published the event.",
    });
  }

  async create(req, res) {
    try {
      console.log(req.body);
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

// const create = async (req, res) => {
//   try {
//     console.log(req.body);
//     const response = await bookingService.createBooking(req.body);
//     return res.status(StatusCodes.OK).json({
//       message: "Successfully completed booking",
//       success: true,
//       err: {},
//       data: response,
//     });
//   } catch (error) {
//     return res.status(error.statusCode).json({
//       message: error.message,
//       success: false,
//       err: error.explanation,
//       data: {},
//     });
//   }
// };

module.exports = BookingController;
