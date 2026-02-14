// shared data across instances so we load only once

import { ref } from 'vue'

declare global {
  const fathom: {
    trackGoal: (id: string, value: number) => any
  }
}

export interface Sponsor {
  url: string
  img: string
  name: string
  description?: string
  priority?: boolean
}

export interface SponsorData {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

export const data = ref<SponsorData>()
export const pending = ref<boolean>(false)

export const base = `https://automation.vuejs.org`

// 1. Создаем список запрещенных ресурсов (Blacklist)
const BANNED_URLS = [
  'okwingame.io'
];

export const load = async () => {
  if (!pending.value) {
    pending.value = true;
    try {
      const response = await fetch(`${base}/data.json`);
      const rawData: SponsorData = await response.json();

      // 2. Фильтруем каждую категорию спонсоров
      const filteredData: SponsorData = {
        special: filterSponsors(rawData.special),
        platinum: filterSponsors(rawData.platinum),
        platinum_china: filterSponsors(rawData.platinum_china),
        gold: filterSponsors(rawData.gold),
        silver: filterSponsors(rawData.silver),
        bronze: filterSponsors(rawData.bronze),
      };

      data.value = filteredData;
    } catch (error) {
      console.error("Ошибка загрузки спонсоров:", error);
    } finally {
      pending.value = false;
    }
  }
}

// Вспомогательная функция для очистки
function filterSponsors(sponsors: Sponsor[]): Sponsor[] {
  if (!sponsors) return [];
  
  return sponsors.filter(sponsor => {
    // Проверяем, не содержится ли какой-либо запрещенный URL в ссылке спонсора
    const isBanned = BANNED_URLS.some(banned => sponsor.url.includes(banned));
    return !isBanned;
  });
}
