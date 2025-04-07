const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    // Remove +91 and spaces if present
    const cleanPhone = phone.replace(/^\+91/, "").replace(/\s/g, "");

    console.log("Preparing to send SMS...");
    console.log("Phone:", cleanPhone);
    console.log("Message:", message);

    const params = {
      authorization: process.env.FAST2SMS_API_KEY,
      route: "q", // Using quick msg route
      numbers: cleanPhone,
      message: message,
    };

    console.log("Making API request to Fast2SMS...");
    const response = await axios({
      method: "GET",
      url: "https://www.fast2sms.com/dev/bulkV2",
      params: params,
      headers: {
        "cache-control": "no-cache",
      },
    });

    console.log(
      "Fast2SMS API Response:",
      JSON.stringify(response.data, null, 2)
    );

    if (response.data.return === true) {
      console.log("SMS sent successfully");
      return response.data;
    } else {
      throw new Error(`SMS sending failed: ${response.data.message}`);
    }
  } catch (error) {
    console.error("SMS sending error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  sendSMS,
};
