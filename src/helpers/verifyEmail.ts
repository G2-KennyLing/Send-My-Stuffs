import * as mailer from "nodemailer";

interface Message {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}
const account = {
  user: "mai.travan@gmail.com",
  pass: "http://tottistore.com",
};
export default class Nodemailer {
  public async sendMail(msg: Message) {
    let transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      service: "Gmail",
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });
    msg.from = `Send my stuffs <mai.vantran@gmail.com>`;
    let info = await transporter.sendMail(msg);
    return info;
  }
  public verifyEmailTemplate = (verifyLink: string) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <title>Totti Store</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#B6EB7A" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#B6EB7A" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center">
                                                        <a href="${verifyLink}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; text-decoration: none; padding: 15px 25px; border-radius: 2px; display: inline-block;background: #B6EB7A">Confirm Account</a>
                                                    </td>
                                                    <td style = "display: flex;justify-content: center;padding:20px;">
                                                        <p style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #666666">or 
                                                        <a style="color: #B6EB7A;" href="">Visit our store</a></p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            
                        </tr> <!-- COPY -->
                        
                    </table>
                </td>
                 
            </tr>
           
        </table>
    </body>
    
    </html>`;
  };
  public forgotPasswordTemplate = (verifyLink: string) => {
    return `
    <!DOCTYPE html><html><head> <title></title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/></head><body style=" background-color: #e1e1e1; margin: 0 !important; padding: 0 !important; "> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; "> We're thrilled to have you here! Get ready to dive into your new account. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#363636" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px"> <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td></tr></table> </td></tr><tr> <td bgcolor="#363636" align="center" style="padding: 0px 10px 0px 10px"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px"> <tr> <td bgcolor="#ffffff" align="center" valign="top" style=" padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px; "> <h1 style="font-size: 48px; font-weight: 400; margin: 2"> RESET PASSWORD! </h1> <img src="https://res.cloudinary.com/hoanghai/image/upload/v1610362599/BookStore/sms-logo_uxgnxn.png" width="125" height="120" style="display: block; border: 0px"/> </td></tr></table> </td></tr><tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px"> <tr> <td bgcolor="#ffffff" align="left" style=" padding: 20px 30px 40px 30px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; "> <p style="margin: 0"> If you've lost your password or wish to reset it, use the link below to get started. </p></td></tr><tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 3px" bgcolor="#363636"> <a href="${verifyLink}" target="_blank" style=" font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block; ">Reset Password</a > </td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 0px 30px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " > <p style="margin: 0"> If that doesn't work, copy and paste the following link in your browser: </p></td></tr><tr> <td bgcolor="#ffffff" align="left" style=" padding: 20px 30px 20px 30px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " > <p style="margin: 0"> <a href="${verifyLink}" target="_blank" style="color: #1746e0 " >${verifyLink}</a > </p></td></tr><tr> <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " > <p style="margin: 0"> If you have any questions, just reply to this email—we're always happy to help out. </p></td></tr><tr> <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " > <p style="margin: 0">Send my stuffs,<br/>Our Team</p></td></tr></table> </td></tr><tr> <td bgcolor="#e1e1e1" align="center" style="padding: 30px 10px 0px 10px" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px" > <tr> <td bgcolor="#363636" align="center" style=" padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " > <h2 style=" font-size: 20px; font-weight: 400; color: #111111; margin: 0; " > Need more help? </h2> <p style="margin: 0"> <a href="#" target="_blank" style="color: #ffffff" >We&rsquo;re here to help you out</a > </p></td></tr></table> </td></tr><tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px" > <tr> <td bgcolor="#e1e1e1" align="left" style=" padding: 0px 30px 30px 30px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px; " > <br/> <p style="margin: 0"> If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700" >unsubscribe</a >. </p></td></tr></table> </td></tr></table> </body></html>`;
  };
}
