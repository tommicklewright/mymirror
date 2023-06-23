import { defineStore } from 'pinia';

export type Specialty = 'ADD/ADHD' | 'Alcohol and Drug Use' | 'Anger' | 'Anxiety' | 'Autism Spectrum Disorder' | 'Bipolar Disorder' | 'Burnout';
export type Gender = 'Male' | 'Female' | 'Non-Binary';
export type PsychologistType = 'Clinical' | 'General';

export type Psychologist = {
  name: string,
  type: PsychologistType,
  gender: Gender,
  specialties: Specialty[],
  description: string,
  availability: Date[],
  languages: string[],
  image: string,
};

type PsychologistStore = {
  psychologists: Psychologist[] | null,
  types: PsychologistType[],
  typeMap: {
    Clinical: 'Clinical Psychologist',
    General: 'Psychologist',
  }
  specialties: Specialty[],
  genders: Gender[],
  languages: string[],
};

const defaultStore: PsychologistStore = {
  psychologists: null,
  types: [ 'Clinical', 'General' ],
  typeMap: {
    Clinical: 'Clinical Psychologist',
    General: 'Psychologist',
  },
  specialties: ['ADD/ADHD', 'Alcohol and Drug Use', 'Anger', 'Anxiety', 'Autism Spectrum Disorder', 'Bipolar Disorder', 'Burnout'],
  genders: ['Female', 'Male', 'Non-Binary'],
  languages: ['Afrikaans', 'Arabic', 'Bangla', 'Cantonese', 'Dari', 'English', 'Finnish', 'French', 'Greek'],
};

export const usePsychologistStore = defineStore('psychologists', {
  state: () => defaultStore,
  actions: {
    async fetchPsychologists() {
      this.psychologists = await useApi().get<Psychologist[]>('/psychologists');
    },
    filteredPsychologists(filters: { 
      name?: string, 
      gender?: Gender | null, 
      type?: PsychologistType | null, 
      specialty?: Specialty | null, 
      language?: string | null,
    }): Psychologist[] {
      const loweredNameParts = filters.name ? filters.name.toLowerCase().split(' ') : null;
      
      return this.psychologists?.filter((psychologist) => {
        if (loweredNameParts) {
          const loweredName = psychologist.name.toLowerCase();

          if (loweredNameParts.find((part) => part && loweredName.indexOf(part) === -1)) {
            return false;
          }
        }

        if (filters.gender && filters.gender !== psychologist.gender) {
          return false;
        }

        if (filters.type && filters.type !== psychologist.type) {
          return false;
        }

        if (filters.specialty && psychologist.specialties.indexOf(filters.specialty) === -1) {
          return false;
        }

        if (filters.language && psychologist.languages.indexOf(filters.language) === -1) {
          return false;
        }

        return true;
      }) || [];
    },
  },
});