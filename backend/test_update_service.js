import dotenv from 'dotenv';
dotenv.config();

import db, { updateService } from './database.js';

const showServices = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM services');
        console.log('Servicios actuales:', rows);
    } catch (err) {
        console.error('Error listando servicios:', err);
    }
};

const run = async () => {
    console.log('USE_MOCK_DB=', process.env.USE_MOCK_DB);
    console.log('--- Antes ---');
    await showServices();

    const updated = await updateService(1, {
        name: 'Instalación v2',
        description: 'Descripción actualizada desde test',
        category: 'mantenimiento'
    });

    console.log('Update result:', updated);

    console.log('--- Después ---');
    await showServices();

    process.exit(0);
};

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
