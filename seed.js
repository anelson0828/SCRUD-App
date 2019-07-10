const { green, red } = require('chalk');
const { db } = require('./server/db');

const Student = require('./server/db/Student');
const Campus = require('./server/db/Campus');
const faker = require('faker');

const createStudent = async () => {
  for (let i = 0; i < 100; i++) {
    const student = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      imageUrl: faker.image.avatar(),
      gpa: faker.random.number({ min: 0.0, max: 4.0 }),
    };
    await Student.create(student);
  }
};

const createCampus = async () => {
  for (let i = 0; i < 100; i++) {
    const campus = {
      name: faker.company.companyName(),
      imageUrl: faker.image.image(),
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(),
    };
    await Campus.create(campus);
  }
};

const seed = async () => {
  try {
    await db.sync({ force: true });
    await createStudent();
    await createCampus();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
