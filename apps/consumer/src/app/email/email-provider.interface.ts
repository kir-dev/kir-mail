import { SingleSendRequestDto } from '@kir-mail/types';

export abstract class EmailProvider {
  /**
   * Sends an email using the provider implementation
   * @param data The email data to send
   * @returns A promise that resolves when the email is sent
   */
  abstract sendEmail(data: SingleSendRequestDto): Promise<void>;
}
