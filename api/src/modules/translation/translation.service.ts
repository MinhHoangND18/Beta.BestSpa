import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Service } from '../services/entities/services.entity';

const translateClient = new Translate();

@Injectable()
export class TranslationService {
  private readonly languagesToTranslate = ['ko', 'ja']; 

  async translateText(
    text: string,
    targetLanguage: string,
  ): Promise<string> {
    if (!text) return '';
    try {
      const [translation] = await translateClient.translate(
        text,
        targetLanguage,
      );
      return Array.isArray(translation) ? translation[0] : translation;
    } catch (error) {
      console.error(
        `[TranslationService] Lỗi khi dịch văn bản sang ${targetLanguage}:`,
        error,
      );
      return text; 
    }
  }

  async translateServicesData(
    services: Service[],
    targetLang: string,
  ): Promise<Service[]> {
    if (!this.languagesToTranslate.includes(targetLang.toLowerCase())) {
      return services; 
    }

    const translatedServices = await Promise.all(
      services.map(async (service) => {
        const [translatedName, translatedDescription] = await Promise.all([
          this.translateText(service.name, targetLang),
          this.translateText(service.description, targetLang),
        ]);

        return {
          ...service,
          name: translatedName,
          description: translatedDescription,
        } as Service;
      }),
    );

    return translatedServices;
  }
}