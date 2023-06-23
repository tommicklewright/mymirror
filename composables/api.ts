export const useApi = () => ({
  get: async <T>(uri: string): Promise<T | null> => {
    await useWait().milliseconds(300);

    switch (uri) {
      case '/psychologists':
        const description = 'I am a supportive and encouraging practitioner with a passion for positive and preventative psychology.';
        const availability = [
          [ new Date(), new Date() ],
          [ new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)],
        ];

        const languages = ['English', 'Cantonese'];
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

        return Array.from({ length: random.between(20, 60) }, () => {
          const gender = random.inArray(genders);
          const name = `${random.inArray(names[gender])} ${random.inArray(names.surname)}`;
          const type = random.inArray(['Clinical', 'General']);
          const image = random.inArray(images[gender]);
          const avail = random.inArray(availability);

          return {
            name,
            type,
            gender,
            languages,
            description,
            availability: avail,
            image,
          };
        }) as T;
      default:
        return null;
    }
  },
});