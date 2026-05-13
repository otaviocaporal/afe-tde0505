import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Produto } from '../../models/produto';
import { inject } from '../../../../node_modules/@angular/core/types/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  imports: [CurrencyPipe],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.css',
})
export class ProdutoList {
  private readonly produtosService = inject(ProdutoService);
  produtos: Produto[] = [];
  carregando: boolean = false;

  ngOnInit() {
    this.produtosService.listar()
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.produtosService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro)
        this.carregando = false
      }
    })
  }
}
