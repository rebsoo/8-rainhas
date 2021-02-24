
class DNA {
    constructor(newgenes) {
        // DNA is random permutation of int values between 1 and 8
        // The genetic sequence
        // It needs to be in binary representation
        if (newgenes) {
            this.genes = newgenes;
        } else {
            let permutacao = [1, 2, 3, 4, 5, 6, 7, 8]; // Já que temos 8 rainhas para posicionar
            shuffle(permutacao);
            for (let i = 0; i < permutacao.length; i++) {
                let binario = permutacao[i].toString(2); // Passa o número da permutação para binário
                binario = ('0000' + binario).slice(-4); // Preenche com zeros a esquerda se necessário
                permutacao[i] = binario; // Número binário com 4 casas adicionado a permutação
            }
            this.genes = permutacao;
        }
    }

    crossover(c, partner) { // acho que vai ter que mudar esses parâmetros de entrada p/ os 2 pais

        if (random(1) < c) { // se for maior ou igual a c (no nosso caso 90%) ele faz o crossover
            let child = new Array(this.genes.length);
            let crossover = floor(random(this.genes.length));
            for (let i = 0; i < this.genes.length; i++) {
                if (i > crossover) child[i] = this.genes[i];
                else child[i] = partner.genes[i];
            }
            let newgenes = new DNA(child);
            return newgenes;
        } else {
            // repetir o mesmo gene dos pais = 2 filhos com cada um
            // sendo a cópia idêntica de um dos pais

        }

    }

    // ~ based on a mutation probability, picks a new random character in array spots ~
    mutate(m) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < m) {
                this.genes[i] = random(0, 1);
            }
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}