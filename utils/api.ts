export const useApi = () => ({
  get: async <T>(uri: string): Promise<T | null> => {
    await useWait().milliseconds(300);

    switch (uri) {
      case '/psychologists':
        const descriptions = [
          'I am a supportive and encouraging practitioner with a passion for positive and preventative psychology.',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ];

        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        const availability = [
          [ 
            { date: new Date(year, month, day, 8, 0), surcharge: 25 }, 
            { date: new Date(year, month, day, 9, 0) }, 
            { date: new Date(year, month, day, 10, 0) }, 
            { date: new Date(year, month, day, 11, 30) }, 
            { date: new Date(year, month, day, 12, 30) },
            { date: new Date(year, month, day, 13, 30) },
            { date: new Date(year, month, day, 14, 0) },
            { date: new Date(year, month, day, 14, 30) },
            { date: new Date(year, month, day, 16, 0) },
            { date: new Date(year, month, day, 17, 30) },
          ],
          [ 
            { date: new Date(year, month, day + 1, 8, 0), surcharge: 25 }, 
            { date: new Date(year, month, day + 1, 9, 0) }, 
            { date: new Date(year, month, day + 1, 10, 0) }, 
            { date: new Date(year, month, day + 1, 11, 30) }, 
            { date: new Date(year, month, day + 1, 12, 30) },
            { date: new Date(year, month, day + 1, 16, 30) },
            { date: new Date(year, month, day + 1, 17, 0) },
          ],
          [ 
            { date: new Date(year, month, day + 2, 8, 0), surcharge: 25 }, 
            { date: new Date(year, month, day + 2, 9, 0) }, 
            { date: new Date(year, month, day + 2, 10, 0) }, 
            { date: new Date(year, month, day + 2, 11, 30) }, 
            { date: new Date(year, month, day + 2, 12, 30) },
            { date: new Date(year, month, day + 2, 13, 30) },
            { date: new Date(year, month, day + 2, 14, 0) },
          ],
          [
            { date: new Date(year, month, day, 11, 30) }, 
            { date: new Date(year, month, day, 12, 30) },
            { date: new Date(year, month, day, 13, 30) },
            { date: new Date(year, month, day, 14, 0) },
            { date: new Date(year, month, day, 14, 30) },
            { date: new Date(year, month, day, 16, 0) },
            { date: new Date(year, month, day, 17, 30) },
          ],
        ];

        const psychologistStore = usePsychologistStore();
        // const allLanguages = ['Afrikaans', 'Arabic', 'Bangla', 'Cantonese', 'Dari', 'English', 'Finnish', 'French', 'Greek', 'Urdu'];
        // const allSpecialties = 

        const images = { 
          female: [ 
            '/assets/psychologist.jpg', '/assets/psychologist2.jpg', '/assets/psychologist3.jpg', '/assets/psychologist5.webp'
          ],
          male: [
            '/assets/psychologist4.webp',
          ],
        };

        const names = {
          male: [ 'John', 'Jake', 'Joshua', 'Jim' ],
          female: [ 'Jane', 'Joan', 'Jean', 'Jasmine' ],
          surname: [ 'Citizen', 'Smith' ]
        };

        const genders: ('male' | 'female')[] = ['male', 'female'];

        const random = useRandom();

        return Array.from({ length: random.between(20, 30) }, () => {
          const gender = random.inArray(genders);
          const name = `${random.inArray(names[gender])} ${random.inArray(names.surname)}`;
          const type = random.inArray(psychologistStore.types);
          const image = random.inArray(images[gender]);
          const avail = random.inArray(availability);
          const description = random.inArray(descriptions);
          const languages = Array.from({ length: random.between(1, 3) }, () => random.inArray(psychologistStore.languages));
          const specialties = Array.from({ length: random.between(2, 5) }, () => random.inArray(psychologistStore.specialties));

          return {
            name,
            type,
            gender: `${gender[0].toUpperCase()}${gender.substring(1)}`,
            languages,
            description,
            availability: avail,
            image,
            specialties,
          };
        }) as T;
      default:
        return null;
    }
  },
});