const { Engine } = require('json-rules-engine');

const rules = [
    {
        conditions: {
            all: [
                { fact: 'movimentosInvoluntarios', operator: 'greaterThan', value: 0.1 },
                {
                    any: [
                        { fact: 'bocejosFrequentes', operator: 'greaterThan', value: 0.7 },
                        { fact: 'movimentosLentos', operator: 'greaterThan', value: 0.6 },
                        { fact: 'cabecaErguida', operator: 'greaterThan', value: 0.8 },
                        { fact: 'olhosLacrimejantes', operator: 'greaterThan', value: 0.7 },
                        { fact: 'concentracao', operator: 'lessThan', value: 0.3 }
                    ]
                }
            ]
        },
        event: { type: 'sonolento', params: { message: 'Você parece estar sonolento. Faça uma pausa!' } }
    },
    {
        conditions: {
            all: [
                { fact: 'movimentosInvoluntarios', operator: 'greaterThan', value: 0.1 },
                {
                    any: [
                        { fact: 'bocejosFrequentes', operator: 'greaterThan', value: 0.4 },
                        { fact: 'movimentosLentos', operator: 'greaterThan', value: 0.4 },
                        { fact: 'cabecaErguida', operator: 'greaterThan', value: 0.5 },
                        { fact: 'olhosLacrimejantes', operator: 'greaterThan', value: 0.4 },
                        { fact: 'concentracao', operator: 'lessThan', value: 0.2 }
                    ]
                }
            ]
        },
        event: { type: 'cansado', params: { message: 'Você parece está um pouco cansado, encoste o caminhão e faça uma pausa' } }
    },
    {
        conditions: {
            all: [
                { fact: 'movimentosInvoluntarios', operator: 'greaterThan', value: 0.1 },
                { fact: 'olhosAvermelhados', operator: 'greaterThan', value: 0.6 },
                { fact: 'inchacoFacial', operator: 'greaterThan', value: 0.5 }
            ]
        },
        event: { type: 'alcoolizado', params: { message: 'Você pode estar alcoolizado. Por favor, pare o veículo de forma segura!' } }
    }
];

function avaliarFadiga(sintomas) {
    const Engine = require('json-rules-engine').Engine;

    const engine = new Engine();

    rules.forEach(rule => engine.addRule(rule));

    return engine
        .run(sintomas)
        .then(results => {
            for (const event of results.events) {
                console.log(event.params.message);
                return event.params.message;
            }
            console.log("Nenhum caso encontrado para os sintomas fornecidos.");
            return "Nenhum caso encontrado para os sintomas fornecidos.";
        })
        .catch(error => {
            console.log("Ocorreu um erro ao avaliar os sintomas:", error);
            return "Ocorreu um erro ao avaliar os sintomas.";
        });
}




// Sintomas do paciente (contexto)
/*
const sintomas = {
  bocejosFrequentes: 0.8,
  olhosAvermelhados: 0.7,
  inchacoFacial: 0.6,
  movimentosLentos: 0.5,
  cabecaErguida: 0.7,
  olhosLacrimejantes: 0.6,
  concentracao: 0.2,
  movimentosInvoluntarios: 0.3
};
*/

// Sintomas do paciente aleátorios

const sintomas = {
    bocejosFrequentes: Math.random(),
    olhosAvermelhados: Math.random(),
    inchacoFacial: Math.random(),
    movimentosLentos: Math.random(),
    cabecaErguida: Math.random(),
    olhosLacrimejantes: Math.random(),
    concentracao: Math.random(),
    movimentosInvoluntarios: Math.random()
};

//--------------------------------------
avaliarFadiga(sintomas);
