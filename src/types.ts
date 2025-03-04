export interface Person {
     id?: string;
     name: string;
     email: string;
     dob: Date;
     yearSign?: ZodiacSymbol;
     monthSign?: ZodiacSymbol;
     hourSign?: ZodiacSymbol;
     createdAt?: Date;
};

export interface ZodiacSymbol {
     number: number;
     english: string;
     animal: string;
     earthlyBranch: string;
     yinYang: string;
     trine: string;
     fixedElement: string;
     bestMatch: string[];
     averageMatch: string[];
     superBad: string[];
     harmful: string[];
     text: string;
};

export type ZodiacData = Record<string, ZodiacSymbol>;