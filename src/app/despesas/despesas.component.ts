import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { DespesasService } from '../despesas.service';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';
import { DespesaModel } from './despesa.model';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css'],
  providers: [DespesasService]
})

export class DespesasComponent implements OnInit {

  // dataHoje = new Date();
  // mesHoje = this.dataHoje.getMonth();
  // anoHoje = this.dataHoje.getFullYear();

  mes ="05";
  ano = "2022";
  desc!: string;
  selectedRow: any;

  @ViewChild(MatTable)
  table!: MatTable<DespesaModel>;
  displayedColumns: string[] = ['codigo', 'tipo', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'valorPago', 'status', 'responsavel', 'descricaoDetalhada','actions'];
  dataSource!: DespesaModel[];

  constructor (
        public dialog: MatDialog,
        public despesasService: DespesasService,

    ) {

        this.despesasService.listarDespesas()
          .subscribe((data: DespesaModel[]) => {
            this.dataSource = data;
          });
      }

  ngOnInit(): void {
  }

  onRowClicked(row: any) {
    console.log(row);
    this.selectedRow = row;
  }

  valDescricao='';
  getValue(val:string): string {
    return val;
  }

  openDialog(despesa: DespesaModel | null): void {

    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '500px',
      data: despesa === null ? {
        codigo: 0,
        descricao: '' ,
        dataVencimento: '',
        dataPagamento: '',
        valor: 0,
        valorPago: 0,
        descricaoDetalhada:'',
        tipo:'',
        responsavel:''
      } : { codigo: despesa.codigo,
            descricao: despesa.descricao,
            dataVencimento: despesa.dataVencimento,
            dataPagamento: despesa.dataPagamento,
            valor: despesa.valor,
            valorPago: despesa.valorPago,
            descricaoDetalhada: despesa.descricaoDetalhada,
            tipo: despesa.tipo,
            responsavel: despesa.responsavel
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.codigo).includes(result.codigo)) {
          this.despesasService.alterarDespesa(result)
            .subscribe((data: DespesaModel) => {
              console.log(data);
              const index = this.dataSource.findIndex(p => p.codigo === data.codigo);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.despesasService.cadastrarDespesa(result)
            .subscribe((data: DespesaModel) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  listElements( Ano: any, Mes: any, parDesc: String) {

    console.log(Ano + "--" + Mes + "--" + parDesc);

    if (parDesc != "") {

      this.despesasService.listarDespesasPorDescricao(parDesc)
      .subscribe((data: DespesaModel[]) => {
        this.dataSource = data;
      });

    } else {

      this.despesasService.listarDespesasPorVencimento(Ano+Mes)
      .subscribe((data: DespesaModel[]) => {
        this.dataSource = data;
      });

    }


   }

  editElement(despesa: DespesaModel): void {
    console.log(despesa);
    this.openDialog(despesa);
  }

  deleteElement(codigo: BigInteger): void {
    this.despesasService.deletarDespesa(codigo)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.codigo !== codigo);
      })
  }
}
