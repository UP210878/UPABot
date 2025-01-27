const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowNuevos = addKeyword(['nuevo', 'ingreso', 'n', '3', '3.'])
    .addAnswer(
        [
            '👋 La convocatoria de admisión estará disponible desde el *07 de febrero de 2025* hasta *24 de julio del 2025*.',
            'Puedes informarte más sobre nuestras convocatorias en nuestra página:',
            'https://upa.edu.mx/oferta-educativa/convocatoria/',
            '',
            'Escribe *1* para Pagos, *2* para Ubicación o *Menu* para regresar al menú principal.',
        ]
        , null
        , null
        , [] // Referencias cruzadas se añaden después
    );

const flowUbicacion = addKeyword(['Ubicación', 'Ubicacion', '2', '2.', 'U'])
    .addAnswer(
        [
            '📍 Nuestra sucursal está en:',
            'Calle Paseo San Gerardo No. 207, Fracc. San Gerardo, C.P. 20342. Aguascalientes, Ags., México.',
            '',
            'Escribe *1* para Pagos, *3* para Nuevo Ingreso o *Menu* para regresar al menú principal.',
        ]
        , null
        , null
        , [] // Referencias cruzadas se añaden después
    );

const flowPagos = addKeyword(['Pagos', '1', '1.', 'P'])
    .addAnswer(
        [
            '💵 Aquí están los detalles de los pagos principales:',
            '- Inscripción: *$690.00*',
            '- Mensualidad: *$1 140.00*',
            '- Examen de Recuperación: *$195.00*',
            '',
            'Escribe *2* para Ubicación, *3* para Nuevo Ingreso o *Menu* para regresar al menú principal.',
        ]
        , null
        , null
        , [] // Referencias cruzadas se añaden después
    );
    
const flowAdios = addKeyword(['adios','Adios','Adiós','adiós'])
    .addAnswer('🙌 Que tengas un excelente dia, si tienes más dudas no dudes en llamarnos al *01 (449) 442 1400*')

const flowPrincipal = addKeyword([EVENTS.WELCOME, 'Menu','menú','Menú', 'Hola'])
    .addAnswer('🙌 Bienvenido a la *UPA*')
    .addAnswer(
        [
            'Estamos aquí para servirte, ¿en qué te puedo ayudar?',
            '💵 *1.* Pagos', 
            '🌎 *2.* Ubicación', 
            '👋 *3.* Nuevo Ingreso',
        ]
        , null
        , null
        , [flowPagos, flowUbicacion, flowNuevos,flowAdios]
    );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowNuevos, flowPagos, flowUbicacion, flowAdios])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
