class DNA {
    constructor(genes_) {
        if (genes_) {
            this.genes = genes_;
        } else {
            let genes = [1, 2, 3, 4, 5, 6, 7, 8];
            shuffle(genes);

            for (let i = 0; i < genes.length; i++) {
                genes[i] = ('0000' + genes[i].toString(2)).slice(-4);
            }
            this.genes = genes;
        }
    }

    getGenes() {
        return this.genes;
    };

    crossover(crossoverRate, partnerDNA) { 
        if (Math.random() < crossoverRate) {
            var corte = (Math.floor(Math.random() * 6) + 1); // retorna de 1 - 6

            var momGenes1 = this.genes.slice(0, corte);
            var momGenes2 = this.genes.slice(corte);

            var dadGenes1 = partnerDNA.getGenes().slice(0, corte);
            var dadGenes2 = partnerDNA.getGenes().slice(corte);
            
            var child1Genes = momGenes1.concat(dadGenes2);                                                                                                                                                                                                                 
            var child2Genes = dadGenes1.concat(momGenes2);

            for (let i = corte; i < child1Genes.length; i++) {
                if (momGenes1.includes(child1Genes[i])) {
                    for (let ii = 0; ii < dadGenes1.length; ii++){
                        if(!child1Genes.slice(0, i).includes(dadGenes1[ii])) {
                            child1Genes[i] = dadGenes1[ii];
                        }
                    }
                }
            }

            for (let i = corte; i < child2Genes.length; i++) {
                if (dadGenes1.includes(child2Genes[i])) {
                    for (let ii = 0; ii < momGenes1.length; ii++){
                        if(!child2Genes.slice(0, i).includes(momGenes1[ii])) {
                            child2Genes[i] = momGenes1[ii];
                        }
                    }
                }
            }
        } else {
            var child1Genes =  this.genes;                                                                                                                                                                                                          
            var child2Genes =  partnerDNA.getGenes();
        }
        return {
            child1Genes: new DNA(child1Genes), 
            child2Genes: new DNA(child2Genes)
        };
        
    }

    mutate(mutationRate) {
        if (Math.random() < mutationRate) {
            let sameIndex = true;
            let index1 = Math.floor(Math.random() * 8);
            let index2 = 0;

        while (sameIndex) {
            index2 = Math.floor(Math.random() * 8);
            if (index1 != index2) {
                sameIndex = false;
            }
        }
        let temp = this.genes[index2];
        this.genes[index2] = this.genes[index1];
        this.genes[index1] = temp;

        }
    }
}

