import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('usermanager', 'root', '1000', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected database!');
  })
  .catch((error) => {
    console.error('Not connect database!');
  });

export default sequelize;
