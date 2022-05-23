import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespesaModel } from './despesas/despesa.model';

/*  @Injectable({
  providedIn: 'root'
}) */ 
@Injectable()
export class DespesasService {

  DespesaApiUrl = "http://localhost:8080/api/v1/movimento";

  constructor(private http: HttpClient ) { }

  listarDespesas(): Observable <DespesaModel[]> {
    return this.http.get<DespesaModel[]>(this.DespesaApiUrl);
  }

  listarDespesasPorDescricao(desc: String): Observable <DespesaModel[]> {
    //return this.http.get<DespesaModel[]>(this.DespesaApiUrl);
    return this.http.get<DespesaModel[]>(this.DespesaApiUrl + "/descricao/" + desc);
  }

  listarDespesasPorVencimento(AnoMes: any): Observable <DespesaModel[]> {
    return this.http.get<DespesaModel[]>(this.DespesaApiUrl + "/anomes/" + AnoMes);
  }

  cadastrarDespesa(despesa: DespesaModel): Observable <DespesaModel> {
    return this.http.post<DespesaModel>(this.DespesaApiUrl, despesa); 
  }

  alterarDespesa(despesa: DespesaModel): Observable <DespesaModel> {
    return this.http.put<DespesaModel>(`${this.DespesaApiUrl}/${despesa.codigo}`, despesa); 
  }

  deletarDespesa(codigo: BigInteger): Observable<any> {
    return this.http.delete<DespesaModel>(`${this.DespesaApiUrl}/${codigo}`);
  }
}
