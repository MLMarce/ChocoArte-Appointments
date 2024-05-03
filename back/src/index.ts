import { PORT } from './config/envs';
import app from './server';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize()
    .then(res => {
        console.log('base de datos conectada correctamente')
        app.listen(PORT, () => {
            console.log(`server listening on http://localhost:${PORT}`)
        });
    })
    .catch(err => console.log(err.message))

