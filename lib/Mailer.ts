import nodemailer, {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "../mails/Mail";

class Mailer {
    transporter: Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    send = async (to: string, subject: string, text: string, html: string,
                file: any|null = null) => {
        try {
            const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`
            let mailOptions = {
                from, to, subject, text, html,
                attachments: (!file) ? undefined :
                    [
                        {
                            filename: file.originalFilename,
                            path: file.filepath,
                        }
                    ]
            }

            return await this.transporter.sendMail(mailOptions)
        } catch (e) {
            console.log(e)
            return null
        }
    }

    sendMail = async (to: string, mail: Mail) => {
        const result = await this.send(to,
            mail.getSubject(),
            mail.getText(),
            mail.getHtml(),
            mail.getFile()
        )
        return result != null
    }
}

export default Mailer