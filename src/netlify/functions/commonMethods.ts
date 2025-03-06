import { ZodiacSymbol, ZodiacData } from "@/types"

export const getFullChineseZodiac = (year: number, month: number, day: number, hour: number): { yearZodiac: string, monthZodiac: string, hourZodiac: string } => {
     const zodiacAnimals = [
          "Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox",
          "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"
     ];

     const monthZodiacs = [
          "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse",
          "Goat", "Monkey", "Rooster", "Dog", "Pig", "Rat"
     ];

     const hourZodiacs = [
          "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
          "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
     ];

     // Chinese New Year dates for some years (approximate)
     const chineseNewYearDates: { [key: number]: string } = {
          1995: "1995-01-31",
          2000: "2000-02-05",
          2020: "2020-01-25",
          2023: "2023-01-22",
          2024: "2024-02-10",
     };

     // Get Chinese New Year date or use a default approximation
     const newYearDate = new Date(chineseNewYearDates[year] || `${year}-02-04`);
     const birthDate = new Date(year, month, day);

     // If born before Chinese New Year, use the previous zodiac year
     if (birthDate < newYearDate) {
          year -= 1;
     }

     // Find the corresponding Chinese hour zodiac
     const hourIndex = Math.ceil(hour / 2) % 12;

     return {
          yearZodiac: zodiacAnimals[year % 12],
          monthZodiac: monthZodiacs[(month) % 12], // Adjusted lunar shift
          hourZodiac: hourZodiacs[hourIndex]
     };
};

export const symbolDetails: ZodiacData = {
     "Rat": {
          "number": 1,
          "english": "Rat",
          "animal": "鼠 (shǔ)",
          "earthlyBranch": "子 (zǐ)",
          "yinYang": "Yang",
          "trine": "1st",
          "fixedElement": "Water",
          "bestMatch": ["dragon", "monkey", "ox"],
          "averageMatch": ["pig", "tiger", "dog", "snake", "rabbit", "rooster", "rat"],
          "superBad": ["horse"],
          "harmful": ["goat"],
          "text": "The first Trine consists of the Rat, Dragon, and Monkey. These three signs are considered intense and powerful individuals capable of great good. They are associated with the element of water, seen as great leaders but are also known to be unpredictable. The three are intelligent, adaptive, generous, charismatic, charming, authoritative, confident, eloquent, and artistic. However, they can also exhibit traits such as being manipulative, jealous, selfish, aggressive, vindictive, and deceitful."
     } as ZodiacSymbol,
     "Ox": {
          "number": 2,
          "english": "Ox",
          "animal": "牛 (niú)",
          "earthlyBranch": "丑 (chǒu)",
          "yinYang": "Yin",
          "trine": "2nd",
          "fixedElement": "Earth",
          "bestMatch": ["snake", "rooster", "rat"],
          "averageMatch": ["monkey", "dog", "rabbit", "tiger", "dragon", "pig", "ox"],
          "superBad": ["goat"],
          "harmful": ["horse"],
          "text": "The second Trine consists of the Ox, Snake, and Rooster. These three signs are said to possess endurance and application, with a slow accumulation of energy. They are associated with the element of metal, meticulous at planning but tend to hold fixed opinions. The three are described as intelligent, hard-working, modest, industrious, loyal, philosophical, patient, good-hearted, and morally upright. However, they can also exhibit traits such as being self-righteous, egotistical, vain, judgmental, narrow-minded, and petty."
     } as ZodiacSymbol,
     "Tiger": {
          "number": 3,
          "english": "Tiger",
          "animal": "虎 (hǔ)",
          "earthlyBranch": "寅 (yín)",
          "yinYang": "Yang",
          "trine": "3rd",
          "fixedElement": "Wood",
          "bestMatch": ["horse", "dog", "pig"],
          "averageMatch": ["rabbit", "dragon", "rooster", "rat", "goat", "ox", "tiger"],
          "superBad": ["monkey"],
          "harmful": ["snake"],
          "text": "The third Trine consists of the Tiger, Horse, and Dog. These three signs are associated with the element of fire, said to seek true love, pursue humanitarian causes, and be idealistic and independent, but they tend to be impulsive. They are described as productive, enthusiastic, independent, engaging, dynamic, honorable, loyal, and protective. However, they can also display traits such as being rash, rebellious, quarrelsome, anxious, disagreeable, and stubborn."
     } as ZodiacSymbol,
     "Rabbit": {
          "number": 4,
          "english": "Rabbit",
          "animal": "兔 (tù)",
          "earthlyBranch": "卯 (mǎo)",
          "yinYang": "Yin",
          "trine": "4th",
          "fixedElement": "Wood",
          "bestMatch": ["pig", "goat", "dog"],
          "averageMatch": ["tiger", "monkey", "rabbit", "ox", "horse", "rat", "snake"],
          "superBad": ["rooster"],
          "harmful": ["dragon"],
          "text": "The fourth Trine consists of the Rabbit, Goat, and Pig. These three signs are associated with the element of wood, said to have a calm nature and a somewhat reasonable approach. They seek aesthetic beauty, are artistic, well-mannered, and compassionate, yet they can also be detached and resigned to their condition. The three are described as caring, self-sacrificing, obliging, sensible, creative, empathetic, tactful, and prudent. However, they can also exhibit traits such as being naive, pedantic, insecure, selfish, indecisive, and pessimistic."
     } as ZodiacSymbol,
     "Dragon": {
          "number": 5,
          "english": "Dragon",
          "animal": "龍/龙 (lóng)",
          "earthlyBranch": "辰 (chén)",
          "yinYang": "Yang",
          "trine": "1st",
          "fixedElement": "Earth",
          "bestMatch": ["rat", "monkey", "rooster"],
          "averageMatch": ["tiger", "snake", "horse", "goat", "pig", "ox", "dragon"],
          "superBad": ["dog"],
          "harmful": ["rabbit"],
          "text": "The first Trine consists of the Rat, Dragon, and Monkey. These three signs are considered intense and powerful individuals capable of great good. They are associated with the element of water, seen as great leaders but are also known to be unpredictable. The three are intelligent, adaptive, generous, charismatic, charming, authoritative, confident, eloquent, and artistic. However, they can also exhibit traits such as being manipulative, jealous, selfish, aggressive, vindictive, and deceitful."
     } as ZodiacSymbol,
     "Snake": {
          "number": 6,
          "english": "Snake",
          "animal": "蛇 (shé)",
          "earthlyBranch": "巳 (sì)",
          "yinYang": "Yin",
          "trine": "2nd",
          "fixedElement": "Fire",
          "bestMatch": ["ox", "rooster", "monkey"],
          "averageMatch": ["horse", "dragon", "goat", "dog", "rabbit", "rat", "snake"],
          "superBad": ["pig"],
          "harmful": ["tiger"],
          "text": "The second Trine consists of the Ox, Snake, and Rooster. These three signs are said to possess endurance and application, with a slow accumulation of energy. They are associated with the element of metal, meticulous at planning but tend to hold fixed opinions. The three are described as intelligent, hard-working, modest, industrious, loyal, philosophical, patient, good-hearted, and morally upright. However, they can also exhibit traits such as being self-righteous, egotistical, vain, judgmental, narrow-minded, and petty."
     } as ZodiacSymbol,
     "Horse": {
          "number": 7,
          "english": "Horse",
          "animal": "馬/马 (mǎ)",
          "earthlyBranch": "午 (wǔ)",
          "yinYang": "Yang",
          "trine": "3rd",
          "fixedElement": "Fire",
          "bestMatch": ["dog", "tiger", "goat"],
          "averageMatch": ["snake", "rabbit", "dragon", "rooster", "pig", "monkey", "horse"],
          "superBad": ["rat"],
          "harmful": ["ox"],
          "text": "The third Trine consists of the Tiger, Horse, and Dog. These three signs are associated with the element of fire, said to seek true love, pursue humanitarian causes, and be idealistic and independent, but they tend to be impulsive. They are described as productive, enthusiastic, independent, engaging, dynamic, honorable, loyal, and protective. However, they can also display traits such as being rash, rebellious, quarrelsome, anxious, disagreeable, and stubborn."
     } as ZodiacSymbol,
     "Goat": {
          "number": 8,
          "english": "Goat",
          "animal": "羊 (yáng)",
          "earthlyBranch": "未 (wèi)",
          "yinYang": "Yin",
          "trine": "4th",
          "fixedElement": "Earth",
          "bestMatch": ["rabbit", "pig", "horse"],
          "averageMatch": ["snake", "goat", "dragon", "monkey", "rooster", "dog", "tiger"],
          "superBad": ["ox"],
          "harmful": ["rat"],
          "text": "The fourth Trine consists of the Rabbit, Goat, and Pig. These three signs are associated with the element of wood, said to have a calm nature and a somewhat reasonable approach. They seek aesthetic beauty, are artistic, well-mannered, and compassionate, yet they can also be detached and resigned to their condition. The three are described as caring, self-sacrificing, obliging, sensible, creative, empathetic, tactful, and prudent. However, they can also exhibit traits such as being naive, pedantic, insecure, selfish, indecisive, and pessimistic."
     } as ZodiacSymbol,
     "Monkey": {
          "number": 9,
          "english": "Monkey",
          "animal": "猴 (hóu)",
          "earthlyBranch": "申 (shēn)",
          "yinYang": "Yang",
          "trine": "1st",
          "fixedElement": "Metal",
          "bestMatch": ["dragon", "rat", "snake"],
          "averageMatch": ["monkey", "dog", "ox", "goat", "rabbit", "rooster", "horse"],
          "superBad": ["tiger"],
          "harmful": ["pig"],
          "text": "The first Trine consists of the Rat, Dragon, and Monkey. These three signs are considered intense and powerful individuals capable of great good. They are associated with the element of water, seen as great leaders but are also known to be unpredictable. The three are intelligent, adaptive, generous, charismatic, charming, authoritative, confident, eloquent, and artistic. However, they can also exhibit traits such as being manipulative, jealous, selfish, aggressive, vindictive, and deceitful."
     } as ZodiacSymbol,
     "Rooster": {
          "number": 10,
          "english": "Rooster",
          "animal": "雞/鸡 (jī)",
          "earthlyBranch": "酉 (yǒu)",
          "yinYang": "Yin",
          "trine": "2nd",
          "fixedElement": "Metal",
          "bestMatch": ["ox", "snake", "dragon"],
          "averageMatch": ["horse", "rooster", "goat", "pig", "tiger", "monkey", "rat"],
          "superBad": ["rabbit"],
          "harmful": ["dog"],
          "text": "The second Trine consists of the Ox, Snake, and Rooster. These three signs are said to possess endurance and application, with a slow accumulation of energy. They are associated with the element of metal, meticulous at planning but tend to hold fixed opinions. The three are described as intelligent, hard-working, modest, industrious, loyal, philosophical, patient, good-hearted, and morally upright. However, they can also exhibit traits such as being self-righteous, egotistical, vain, judgmental, narrow-minded, and petty."
     } as ZodiacSymbol,
     "Dog": {
          "number": 11,
          "english": "Dog",
          "animal": "狗 (gǒu)",
          "earthlyBranch": "戌 (xū)",
          "yinYang": "Yang",
          "trine": "3rd",
          "fixedElement": "Earth",
          "bestMatch": ["tiger", "horse", "rabbit"],
          "averageMatch": ["monkey", "pig", "rat", "ox", "snake", "goat", "dog"],
          "superBad": ["dragon"],
          "harmful": ["rooster"],
          "text": "The third Trine consists of the Tiger, Horse, and Dog. These three signs are associated with the element of fire, said to seek true love, pursue humanitarian causes, and be idealistic and independent, but they tend to be impulsive. They are described as productive, enthusiastic, independent, engaging, dynamic, honorable, loyal, and protective. However, they can also display traits such as being rash, rebellious, quarrelsome, anxious, disagreeable, and stubborn."
     } as ZodiacSymbol,
     "Pig": {
          "number": 12,
          "english": "Pig",
          "animal": "豬/猪 (zhū)",
          "earthlyBranch": "亥 (hài)",
          "yinYang": "Yin",
          "trine": "4th",
          "fixedElement": "Water",
          "bestMatch": ["rabbit", "goat", "tiger"],
          "averageMatch": ["rat", "rooster", "dog", "dragon", "horse", "ox", "pig"],
          "superBad": ["snake"],
          "harmful": ["monkey"],
          "text": "The fourth Trine consists of the Rabbit, Goat, and Pig. These three signs are associated with the element of wood, said to have a calm nature and a somewhat reasonable approach. They seek aesthetic beauty, are artistic, well-mannered, and compassionate, yet they can also be detached and resigned to their condition. The three are described as caring, self-sacrificing, obliging, sensible, creative, empathetic, tactful, and prudent. However, they can also exhibit traits such as being naive, pedantic, insecure, selfish, indecisive, and pessimistic."
     } as ZodiacSymbol
};