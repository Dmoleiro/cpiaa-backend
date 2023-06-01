require("dotenv").config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';

const app = express()
app.use(cors({
    //origin: process.env.REMOTE_CLIENT_APP, 
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type'],
    preflightContinue: true
}));
app.use(express.json())

// app.use(cors({
//     origin: 'http://localhost:5173',
// }))

app.post('/send-email', async (req: Request, res: Response) => {
    try {
        await fs.readFile('config.txt', 'utf8', async (err, data) => {
            const strings = data.trim().split('\n')

            if (strings.length >= 2) {
                const emailUser = strings[0]
                const emailPw = strings[1]

                const { to, subject, html } = req.body

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: emailUser,
                        pass: emailPw
                    }
                })

                // Define the email options
                const mailOptions = {
                    from: 'marcacao@cpiaa.site',
                    to,
                    subject,
                    html,
                }

                // Send the email
                const info = await transporter.sendMail(mailOptions)
                console.log('Email sent:', info.response)

                res.status(200).json({ message: 'Email sent successfully' })
            } else {
                throw 'The config file is not valid.' + err
            }
        }
        )

    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ error: 'Error sending email' })
    }
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
})
