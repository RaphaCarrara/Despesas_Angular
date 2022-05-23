export interface DespesaModel {
    codigo: BigInteger ;
    tipo: String;
    descricao: String;
    dataPagamento: Date;
    dataVencimento: Date;
    valor: DoubleRange;
    valorPago: DoubleRange;
    status: String;
    responsavel: String;
    descricaoDetalhada: String;
}
