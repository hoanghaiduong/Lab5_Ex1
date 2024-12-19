const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(
//   "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"
);

exports.sendEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        // Construct the email message
        const msg = {
            to: email, // Recipient email
            from: "hoanghaiduong1711@gmail.com", // Sender email
            subject: subject || "No Subject",
            text: message || "No Message Provided",
            html: `<p>${message || "No Message Provided"}</p>`, // Optional HTML content
        };

        // Send the email
        await sendgrid.send(msg);

        res.json({ status: "success", message: `Email sent to ${email}` });
    } catch (error) {
        // Log detailed error
        console.error("Error sending email:", error);

        res.status(500).json({
            status: "error",
            message: error.response?.body?.errors[0]?.message || error.message || "Failed to send email",
        });
    }
};