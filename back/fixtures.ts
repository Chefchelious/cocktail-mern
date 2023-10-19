import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user_1, user_2] = await User.create(
    {
      email: 'alcoholic@gmail.com',
      password: '123',
      token: 'd233b045-70c6-496c-a234-c38e944c41ac',
      displayName: 'homeboy',
      avatar: 'fixtures/junglejuiceman.png',
    },
    {
      email: 'junglejuicer@gmail.com',
      password: '123',
      token: 'f7aa223d-1c0a-46fd-962a-4cadb74cd293',
      displayName: 'juice man',
      avatar: 'fixtures/juiceman.png',
    },
    {
      email: 'adminHellYeah@gmail.com',
      password: '123',
      token: '9b0d45f7-2320-48a0-b802-119d4e92e1e2',
      displayName: 'Hunch Punch',
      avatar: 'fixtures/admin.png',
      role: 'admin',
    },
  );

  await Cocktail.create(
    {
      author: user_1._id,
      name: 'Black Russian',
      recipe:
        'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.',
      cocktailImage: 'fixtures/black-russian.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Coffee liqueur',
          amount: '3/4 oz',
        },
        {
          name: 'Vodka',
          amount: '1 1/2 oz',
        },
      ],
    },
    {
      author: user_1._id,
      name: 'Egg Nog - Healthy',
      recipe:
        'Whip egg substitute and sugar together, combine with the two kinds of milk, vanilla, and rum. Mix well. Chill over night. Sprinkle with nutmeg. Makes 6 servings.',
      cocktailImage: 'fixtures/egg-nog-healthy.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Egg',
          amount: '1/2 cup',
        },
        {
          name: 'Sugar',
          amount: '3 tblsp',
        },
        {
          name: 'Condensed milk',
          amount: '13 oz skimmed ',
        },
        {
          name: 'Milk',
          amount: '3/4 cup skimmed',
        },
        {
          name: 'Vanilla extract',
          amount: '1 tsp',
        },
        {
          name: 'Rum',
          amount: '1 tsp',
        },
        {
          name: 'Nutmeg',
          amount: 'couple of pinches',
        },
      ],
    },
    {
      author: user_1._id,
      name: 'Godfather',
      recipe:
        'Pour all ingredients directly into old fashioned glass filled with ice cubes. Stir gently.',
      cocktailImage: 'fixtures/godFather.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Scotch',
          amount: '1 1/2 oz ',
        },
        {
          name: 'Amaretto',
          amount: '3/4 oz',
        },
      ],
    },
    {
      author: user_1._id,
      name: 'Godmother',
      recipe: 'Pour vodka and amaretto into an old-fashioned glass over ice and serve.',
      cocktailImage: 'fixtures/godFather.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Vodka',
          amount: '1 1/2 oz ',
        },
        {
          name: 'Amaretto',
          amount: '3/4 oz',
        },
      ],
    },
    {
      author: user_1._id,
      name: 'Margarita',
      recipe:
        'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
      cocktailImage: 'fixtures/margarita.jpg',
      ingredients: [
        {
          name: 'Tequila',
          amount: '1 1/2 oz',
        },
        {
          name: 'Triple sec',
          amount: '1/2 oz',
        },
        {
          name: 'Lime juice',
          amount: '1 oz',
        },
        {
          name: 'Salt',
          amount: 'some',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'Old Fashioned',
      recipe: 'Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange twist, and a cocktail cherry.',
      cocktailImage: 'fixtures/old-fashioned.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Bourbon',
          amount: '4.5 cL',
        },
        {
          name: 'Angostura bitters',
          amount: '2 dashes',
        },
        {
          name: 'Sugar',
          amount: '1 cube',
        },
        {
          name: 'Water',
          amount: 'dash',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'Radioactive Long Island Iced Tea',
      recipe:
        'Pour all ingredients over ice in a very tall glass. Sip cautiously.',
      cocktailImage: 'fixtures/radioactive-tea.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Rum',
          amount: '1 oz ',
        },
        {
          name: 'Vodka',
          amount: '1 oz ',
        },
        {
          name: 'Tequila',
          amount: '1 oz ',
        },
        {
          name: 'Gin',
          amount: '1 oz ',
        },
        {
          name: 'Triple sec',
          amount: '1 oz ',
        },
        {
          name: 'Chambord raspberry liqueur',
          amount: '1 oz ',
        },
        {
          name: 'Midori melon liqueur',
          amount: '1 oz ',
        },
        {
          name: 'Malibu rum',
          amount: '1 oz ',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'Ramos Gin Fizz',
      recipe:
        'Prepare all the ingredients on the counter to be able to work well and quickly, especially the cream and egg white. Pour all the ingredients into a shaker. Shake vigorously for 1 minute: cream and egg white must be mixed perfectly, so don\'t rush.',
      cocktailImage: 'fixtures/ramos-fizz.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Gin',
          amount: '3 cl',
        },
        {
          name: 'Lemon Juice',
          amount: '1 1/2 oz',
        },
        {
          name: 'Sugar Syrup',
          amount: '3 cl',
        },
        {
          name: 'Cream',
          amount: '6 cl',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'Spritz',
      recipe:
        'Build into glass over ice, garnish and serve.',
      cocktailImage: 'fixtures/shpritz.jpg',
      isPublished: true,
      ingredients: [
        {
          name: 'Prosecco ',
          amount: '6 cl',
        },
        {
          name: 'Campari',
          amount: '4 cl',
        },
        {
          name: 'Soda Water',
          amount: 'splash',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'Tequila Sunrise',
      recipe:
        'Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Stir gently to create the sunrise effect. Garnish and serve.',
      cocktailImage: 'tequila-sunrise.jpg',
      ingredients: [
        {
          name: 'Tequila',
          amount: '2 measures ',
        },
        {
          name: 'Orange juice',
          amount: 'by taste',
        },
        {
          name: 'Grenadine',
          amount: 'by taste',
        },
      ],
    },
    {
      author: user_2._id,
      name: 'white-russian',
      recipe:
        'Pour vodka and coffee liqueur over ice cubes in an old-fashioned glass. Fill with light cream and serve.',
      cocktailImage: 'tequila-sunrise.jpg',
      ingredients: [
        {
          name: 'Vodka',
          amount: '2 oz ',
        },
        {
          name: 'Coffee liqueur',
          amount: '1 oz',
        },
        {
          name: 'Light cream',
          amount: 'splash',
        },
      ],
    },
  );

  await db.close();
};

run().catch(console.error);
