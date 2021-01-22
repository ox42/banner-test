import {Sequelize} from 'sequelize-typescript';
import config from 'config';

const sequelize = new Sequelize(Object.assign({},
    config.get('database'),
    {
        models: [__dirname + '/models']
    }
));

export default sequelize;
