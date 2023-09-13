import admin from "firebase-admin";

const serviceAccount = require("../firebase-credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export class NotificationsService {
  public static async sendNotification(
    token: string,
    title: string,
    body: string
  ): Promise<any> {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    await admin.messaging().send(message);
  }
}
